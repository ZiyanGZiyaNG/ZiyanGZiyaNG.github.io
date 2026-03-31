# Segment Tree(ST)

## Intro 
A data structure is implemented using the divide-and-conquer method.
Used to solve interval sum, maximum value, minimum value, and modify.

## Code
```cpp=
void build(int l, int r, int id)
{
    if (l == r)
    {
        tree[id] = v[l];
        return;
    }
    int mid = (l + r) / 2;
    build(l, mid, 2 * id);
    build(mid + 1, r, 2 * id + 1);
    tree[id] = tree[2 * id] + tree[2 * id + 1]; // Sum
    tree[id] = max(tree[2 * id], tree[2 * id + 1]); // Max
    tree[id] = min(tree[2 * id], tree[2 * id + 1]); // Min
}
```

```cpp=
int query(int ql, int qr, int l, int r, int id)
{
    if (ql <= l and r <= qr) return tree[id];
    int mid = (l + r);
    if (mid <= qr) return query(ql, mid, l, r, 2 * id);
    else if (mid > ql) return query(mid + 1, qr, l, r, 2 * id + 1);
    else
    {
        return query(ql, mid, l, mid, 2 * id) + query(mid + 1, qr, mid + 1, r, 2 * id + 1); // Sum
        return max(query(ql, mid, l, mid, 2 * id), query(mid + 1, qr, mid + 1, r, 2 * id + 1)); // Max
        return min(query(ql, mid, l, mid, 2 * id), query(mid + 1, qr, mid + 1, r, 2 * id + 1)); // Min
    }
}
```