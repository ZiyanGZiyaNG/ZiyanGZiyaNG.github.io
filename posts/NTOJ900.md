# [NTOJ - 196](https://toj.tfcis.org/oj/pro/900/)
tag: Dijkstra
基本上是直接裸題了
```cpp=
#include <bits/stdc++.h>
using namespace std;
int r, c;
int g[1005][1005];
long long int dis[1005][1005];
int dx[4] = {1, 0, -1, 0};
int dy[4] = {0, 1, 0, -1};

void dijkstra(int sx, int sy, int tx, int ty)
{
    for (int i = 1; i <= r; i++)
    {
        for (int j = 1; j <= c; j++)
        {
            dis[i][j] = LLONG_MAX;
        }
    }
    priority_queue<pair<long long, pair<int, int>>, 
                   vector<pair<long long, pair<int, int>>>, 
                   greater<pair<long long, pair<int, int>>>> pq;

    dis[sx][sy] = 0;
    pq.push({0, {sx, sy}}); 

    while (!pq.empty())
    {
        long long d = pq.top().first;
        int x = pq.top().second.first;
        int y = pq.top().second.second;
        pq.pop(); 
        if (d > dis[x][y]) continue;
        if (x == tx && y == ty) break;

        for (int i = 0; i < 4; i++)
        {
            int nx = x + dx[i];
            int ny = y + dy[i];
            if (nx < 1 or nx > r or ny < 1 or ny > c) continue;
            long long cost = abs((long long)g[nx][ny] - g[x][y]);
            if (dis[nx][ny] > dis[x][y] + cost)
            {
                dis[nx][ny] = dis[x][y] + cost;
                pq.push({dis[nx][ny], {nx, ny}});
            }
        }
    }
}

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(0);

    if (!(cin >> r >> c)) return 0;
    int r1, c1, r2, c2; 
    cin >> r1 >> c1 >> r2 >> c2;

    for (int i = 1; i <= r; i++)
    {
        for (int j = 1; j <= c; j++)
        {
            cin >> g[i][j];
        }
    }	

    dijkstra(r1, c1, r2, c2);    
    cout << dis[r2][c2] << endl;
}
```