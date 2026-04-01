## Templete

```cpp=
// TOJ - 1099
#include <bits/stdc++.h>
using namespace std;
const long long int mx = 2e5 * 40;
int tot = 0;
int len;
vector<int> a; vector<int> b;
vector<int> sum(mx); 
vector<int> L(mx);
vector<int> R(mx);
vector<int> rt(mx);
int get(const int &val)
{	
	return lower_bound(b.begin() + 1, b.begin() + len + 1, val) - b.begin();
}
int build(int l, int r)
{
	int root = ++tot;
	if (l == r) return root;
	int mid = (l + r) >> 1;
	L[root] = build(l, mid);
	R[root] = build(mid + 1, r);
	return root;
}
int updata(int k, int l, int r, int root)
{
	int d = ++tot;
	L[d] = L[root]; R[d] = R[root];
	sum[d] = sum[root] + 1;
	if (l == r) return d;
	int mid = (l + r) >> 1;
	if (k <= mid)  L[d] = updata(k, l, mid, L[d]);
	else if (k > mid)  R[d] = updata(k, mid + 1, r, R[d]);
	return d;
}
int query(int ql, int qr, int l, int r, int k)
{
	int mid = (l + r) >> 1;
	int x = sum[L[qr]] - sum[L[ql]];
	if (l == r) return l;
	if (k <= x) return query(L[ql], L[qr], l, mid, k);
	else if (k > x) return query(R[ql], R[qr], mid + 1, r, k - x);
}
int main()
{
	int n, q; cin >> n >> q;
	a.resize(n + 1);
	b.resize(n + 1);
	for (int i = 1; i <= n; i++) cin >> a[i];
	b = a;
	sort(b.begin() + 1, b.begin() + 1 + n);
	len = unique(b.begin() + 1, b.begin() + n + 1) - b.begin() - 1;
	rt[0] = build(1, len);
	for (int i = 1; i <= n; i++)
	{
		rt[i] = updata(get(a[i]), 1, len, rt[i - 1]);
	}
	while (q--)
	{
		int l, r; cin >> l >> r;
		int k = (r - l + 2) / 2;
		cout << b[query(rt[l - 1], rt[r], 1, len, k)] << '\n';
	}
}
```