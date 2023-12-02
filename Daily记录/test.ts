function notGreaterCount(matrix, target) {
  // 等价于在matrix 中搜索mid，搜索的过程中利用有序的性质记录比mid小的元素个数
  // 我们选择左下角，作为开始元素
  let curRow = 0;
  // 多少列
  const COL_COUNT = matrix[0].length;
  // 最后一列的索引
  const LAST_COL = COL_COUNT - 1;
  let res = 0;
​
  while (curRow < matrix.length) {
    // 比较最后一列的数据和target的大小
    if (matrix[curRow][LAST_COL] < target) {
      res += COL_COUNT;
    } else {
      let i = COL_COUNT - 1;
      while (i < COL_COUNT && matrix[curRow][i] > target) {
        i--;
      }
      // 注意这里要加1
      res += i + 1;
    }
    curRow++;
  }
​
  return res;
}
/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (matrix, k) {
  if (matrix.length < 1) return null;
  let start = matrix[0][0];
  let end = matrix[matrix.length - 1][matrix[0].length - 1];
  while (start < end) {
    /** 右移和 除2 的区别：
     * * 非负数时： >> 1 和 /2 结果是一样的
     * * 负数 且是 偶数时，  >> 1 和 /2 结果是一样的
     * * 负数 且是 奇数时， 结果不同： -5 >>1 = -3; -5/2 = -2
     *   右移一位 是向下取整， 除2 是向上取整
     *  */ 
    const mid = start + ((end - start) >> 1);
    const count = notGreaterCount(matrix, mid);
    if (count < k) start = mid + 1;
    else end = mid;
  }
  // 返回start,mid, end 都一样
  return start;
};