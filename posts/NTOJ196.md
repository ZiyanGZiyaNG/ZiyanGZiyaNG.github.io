# [NTOJ - 196](https://toj.tfcis.org/oj/pro/196/)
這題基本跟[NTOJ - 16](https://toj.tfcis.org/oj/pro/16)是一樣的但改了一點東西跟在這題需要更好的複雜度
在NTOJ - 16是可以直接暴力搜過去的，時間複雜度為 $O(n ^ 2)$
大概長這樣
```cpp=
#include <bits/stdc++.h>
using namespace std;
int main()
{
	int t; cin >> t;
	while (t--)
	{
		int n; cin >> n;
		vector<int> s(n);
		for (int i = 0; i < n; i++) cin >> s[i];
		vector<bool> v(300001, false);
		for (int i = 0; i < n; i++)
		{
			for (int j = i + 1; j < n; j++)
			{
				if (i != j and s[i] > 0 and s[j] > 0) v[s[i] + s[j]] = true;
			}
		}	
		int q; cin >> q;
		while (q--)
		{
			int w; cin >> w;
			if (v[w]) cout << "Good!\n";	
			else cout << "So Bad!\n";
		}	
	}
}
```
但在這題用這樣的寫法，你會很高興的拿到一個TLE，長這樣
<img src="/images/196TLE.png" class="TLE-img">

很明顯的在這題$O(n ^ 2)$不能AC，所以需要優化
有以下兩種優化方式:

## Bitset
Bitset 解法的核心想法是：先建立一個存在陣列 `exist[x]` 表示數值 `x` 是否出現過，接著對每個存在的數值 `i`，將整個 `exist` 左移 `i` 位（代表所有原本存在的數值 `j` 都變成 `i + j`），並用 OR 合併進答案陣列 `ans`，如此即可一次預處理出所有可能的兩數和；之後每次查詢只需判斷 `ans[w]` 是否為真，即可在 $O(1)$ 時間回答是否存在兩個數相加等於 `w`
長這樣:
```cpp=
#include <bits/stdc++.h>
using namespace std;
int main()
{
	int n; cin >> n;
	vector<int> s(n);
	bitset<200001> exist;
	bitset<200001> ans;
	for (int i = 0; i < n; i++)  cin >> s[i], exist[s[i]] = 1;
	for (int i = 0; i < 200001; i++)
	{
		if (exist[i] == 1)
		{
			exist << i;
			ans |= (exist << i);
		}
	}
	int q; cin >> q;
	while (q--)
	{
		int t; cin >> t;
		if (ans[t] == 1) cout << "yes\n";
		else cout << "no\n";
	}
}
```
## FFT
### 什麼是FFT
-> https://oi-wiki.org/math/poly/fft/
### 解法
FFT 解法是先建立存在陣列 `A[x]` 表示數值 `x` 是否出現，接著計算多項式卷積 `C=A*A`，利用 FFT 將原本需要 $O(n^2)$ 的兩數和計算優化為 $O(V\log V)$，其中若 `C[w]>0` 即代表存在兩個數相加等於 `w`，之後即可用 $O(1)$ 時間回答每筆查詢。
```cpp=
#include <bits/stdc++.h>
using namespace std;

using cd = complex<double>;
const double PI = acos(-1);

void fft(vector<cd> &a, bool invert)
{
    int n = a.size();

    static vector<int> rev;
    static vector<cd> roots{ {0,0}, {1,0} };

    if ((int)rev.size() != n)
    {
        int k = __builtin_ctz(n);
        rev.assign(n, 0);
        for (int i = 0; i < n; i++)
            rev[i] = (rev[i>>1]>>1) | ((i&1)<<(k-1));
    }

    if ((int)roots.size() < n)
    {
        int k = __builtin_ctz(roots.size());
        roots.resize(n);
        while ((1<<k) < n)
        {
            double angle = 2 * PI / (1<<(k+1));
            for (int i = 1<<(k-1); i < (1<<k); i++)
            {
                roots[2*i] = roots[i];
                double ang = angle*(2*i+1-(1<<k));
                roots[2*i+1] = cd(cos(ang), sin(ang));
            }
            k++;
        }
    }

    for (int i = 0; i < n; i++)
        if (i < rev[i])
            swap(a[i], a[rev[i]]);

    for (int len = 1; len < n; len <<= 1)
    {
        for (int i = 0; i < n; i += 2*len)
        {
            for (int j = 0; j < len; j++)
            {
                cd u = a[i+j];
                cd v = a[i+j+len] * roots[len+j];
                a[i+j] = u + v;
                a[i+j+len] = u - v;
            }
        }
    }

    if (invert)
    {
        reverse(a.begin()+1, a.end());
        for (cd &x : a)
            x /= n;
    }
}

vector<long long> multiply(vector<int> &a, vector<int> &b)
{
    vector<cd> fa(a.begin(), a.end()), fb(b.begin(), b.end());

    int n = 1;
    while (n < (int)a.size() + (int)b.size())
        n <<= 1;

    fa.resize(n);
    fb.resize(n);

    fft(fa, false);
    fft(fb, false);

    for (int i = 0; i < n; i++)
        fa[i] *= fb[i];

    fft(fa, true);

    vector<long long> res(n);
    for (int i = 0; i < n; i++)
        res[i] = (long long)(fa[i].real() + 0.5);

    return res;
}

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;

    const int MAXV = 100000;
    vector<int> exist(MAXV + 1, 0);

    for (int i = 0; i < n; i++)
    {
        int x;
        cin >> x;
        exist[x] = 1;
    }

    // 卷積
    vector<long long> conv = multiply(exist, exist);

    int q;
    cin >> q;

    while (q--)
    {
        int w;
        cin >> w;

        if (w < (int)conv.size() && conv[w] > 0)
            cout << "yes\n";
        else
            cout << "no\n";
    }
}
```