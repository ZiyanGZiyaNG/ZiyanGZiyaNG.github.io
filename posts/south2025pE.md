```cpp=
#include <bits/stdc++.h>
using namespace std;
typedef long long int ll;
const ll INF = 1e18;
const ll MOD = 1e9 + 7;
int main()
{
    ios::sync_with_stdio(false);
    cin.tie(0);
    
    int n, m; cin >> n >> m;
    vector<bool> b(n + 1, false);
    for (int i = 0; i < m; i++) 
    {
        int a;
        cin >> a;
        if (a <= n) b[a] = true; 
    }
    
    vector<ll> dp(n + 1, 0); 
    if (!b[0]) dp[0] = 1;
    if (n >= 1 && !b[1]) dp[1] = dp[0]; 
    if (n >= 2 && !b[2]) dp[2] = dp[1] + dp[0];

    for (int i = 3; i <= n; i++)
    {
        if (b[i]) dp[i] = 0;
        else dp[i] = (dp[i - 1] + dp[i - 2] + dp[i - 3]) % MOD;
    }
    cout << dp[n] << '\n';
    vector<ll> cost(n + 1, INF);
    vector<int> from(n + 1, -1);
    
    cost[0] = 0;
    if (dp[n] == 0) return 0;
    for (int i = 1; i <= n; i++)
    {
    	if (b[i]) continue;
    	for (int j = 1; j <= 3; j++)
    	{
    		int pr = i - j;
    		if (pr >= 0 and cost[pr] < INF)
    		{
    			ll t = cost[pr] + i;
    			if (t < cost[i])
    			{
    				cost[i] = t;
    				from[i] = pr;
    			}
    		}
    	}
    }
    
    vector<int> path;
    int cur = n;
    while (cur != 0)
    {
    	path.push_back(cur);
    	cur = from[cur];
    }
    reverse(path.begin(), path.end());
    for (int i = 0; i < path.size(); i++) 
    {
    	cout << path[i];
    	if (i == path.size() - 1) continue;
    	else cout << ",";
    }
}
```