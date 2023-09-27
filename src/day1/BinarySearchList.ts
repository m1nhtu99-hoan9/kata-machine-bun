export default function bs_list(haystack: number[], needle: number): boolean | number {
    console.assert(haystack != null);
    console.assert(Array.isArray(haystack), `haystack is not array: ${haystack}`);

    // [lo , hi)
    let lo = 0, hi = haystack.length;
    do {
        const m = Math.floor((lo + hi - 1) / 2);
        const v = haystack[m];
        if (v === needle) {
            return lo;
        }
        if (v < needle) {
            lo = m + 1;
            continue;
        }
        else {
            hi = m;
            continue;
        }
    } while (lo < hi);
    return -1;
}