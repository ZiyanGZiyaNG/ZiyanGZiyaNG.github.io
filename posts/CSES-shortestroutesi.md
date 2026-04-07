# [CSES - Shortest Routes I](https://cses.fi/problemset/task/1671)
AC(0.14s)
```cpp=
#include <bits/stdc++.h>
using namespace std;
int n, m;
typedef long long int ll;
const ll INF = 1e18;
typedef pair<ll, ll> pii;
vector<vector<pii>> g;
vector<ll> dijkstra(int s)
{
	vector<ll> d(n + 1, INF);
	vector<bool> vis(n + 1, false);
	d[s] = 0;
	priority_queue<pii, vector<pii> , greater<pii>> pq;
	pq.push({d[s], s});
	while (!pq.empty())
	{
		int u = pq.top().second;
		pq.pop();
		if (vis[u]) continue;
		vis[u] = true;
		for (auto &edge : g[u])
		{
			int v = edge.first;
			ll w = edge.second;
			if (d[u] + w < d[v])
			{
				d[v] = d[u] + w;
				pq.push({d[v], v});
			}
		}
	}
	return d;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(0);
	cin >> n >> m;
	g.assign(n + 1, vector<pii> ());
	for (int i = 0; i < m; i++)
	{
		int a, b; cin >> a >> b;
		ll c; cin >> c;
		g[a].push_back({b, c});
	}	
	vector<ll> distances = dijkstra(1);
	for (int i = 1; i <= n; i++)
	{
		cout << distances[i] << " ";
	}
}
```