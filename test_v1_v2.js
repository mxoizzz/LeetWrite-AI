const fs = require('fs');

const V1_API = 'https://leetwrite-ai.onrender.com/api/v1/generate';
const V2_API = 'http://localhost:8081/api/v1/generate';

const problems = [
  { topic: 'HashMap', url: 'https://leetcode.com/problems/two-sum/description/', code: 'class Solution { public int[] twoSum(int[] nums, int target) { java.util.Map<Integer, Integer> map = new java.util.HashMap<>(); for (int i=0; i<nums.length; i++) { if (map.containsKey(target - nums[i])) return new int[]{map.get(target - nums[i]), i}; map.put(nums[i], i); } return new int[]{}; } }' },
  { topic: 'HashSet', url: 'https://leetcode.com/problems/contains-duplicate/description/', code: 'class Solution { public boolean containsDuplicate(int[] nums) { java.util.Set<Integer> set = new java.util.HashSet<>(); for (int n : nums) if (!set.add(n)) return true; return false; } }' },
  { topic: 'Two Pointers', url: 'https://leetcode.com/problems/valid-palindrome/description/', code: 'class Solution { public boolean isPalindrome(String s) { int i=0, j=s.length()-1; while (i<j) { if (!Character.isLetterOrDigit(s.charAt(i))) i++; else if (!Character.isLetterOrDigit(s.charAt(j))) j--; else if (Character.toLowerCase(s.charAt(i++)) != Character.toLowerCase(s.charAt(j--))) return false; } return true; } }' },
  { topic: 'Binary Search', url: 'https://leetcode.com/problems/binary-search/description/', code: 'class Solution { public int search(int[] nums, int target) { int l=0, r=nums.length-1; while (l<=r) { int m=l+(r-l)/2; if (nums[m]==target) return m; if (nums[m]<target) l=m+1; else r=m-1; } return -1; } }' },
  { topic: 'Sliding Window', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/', code: 'class Solution { public int maxProfit(int[] prices) { int min=prices[0], max=0; for (int p : prices) { min=Math.min(min, p); max=Math.max(max, p-min); } return max; } }' },
  { topic: 'DFS', url: 'https://leetcode.com/problems/number-of-islands/description/', code: 'class Solution { public int numIslands(char[][] grid) { int count=0; for (int i=0; i<grid.length; i++) for (int j=0; j<grid[0].length; j++) if (grid[i][j]==\'1\') { dfs(grid, i, j); count++; } return count; } void dfs(char[][] g, int i, int j) { if (i<0 || i>=g.length || j<0 || j>=g[0].length || g[i][j]==\'0\') return; g[i][j]=\'0\'; dfs(g, i+1, j); dfs(g, i-1, j); dfs(g, i, j+1); dfs(g, i, j-1); } }' },
  { topic: 'Dynamic Programming', url: 'https://leetcode.com/problems/climbing-stairs/description/', code: 'class Solution { public int climbStairs(int n) { if (n<=2) return n; int a=1, b=2; for (int i=3; i<=n; i++) { int c=a+b; a=b; b=c; } return b; } }' },
  { topic: 'Greedy', url: 'https://leetcode.com/problems/jump-game/description/', code: 'class Solution { public boolean canJump(int[] nums) { int max=0; for (int i=0; i<=max && i<nums.length; i++) max=Math.max(max, i+nums[i]); return max>=nums.length-1; } }' },
  { topic: 'Math', url: 'https://leetcode.com/problems/plus-one/description/', code: 'class Solution { public int[] plusOne(int[] digits) { for (int i=digits.length-1; i>=0; i--) { if (digits[i]<9) { digits[i]++; return digits; } digits[i]=0; } int[] res = new int[digits.length+1]; res[0]=1; return res; } }' },
  { topic: 'String', url: 'https://leetcode.com/problems/valid-anagram/description/', code: 'class Solution { public boolean isAnagram(String s, String t) { if (s.length()!=t.length()) return false; int[] map = new int[26]; for (char c : s.toCharArray()) map[c-\'a\']++; for (char c : t.toCharArray()) map[c-\'a\']--; for (int n : map) if (n!=0) return false; return true; } }' },
  { topic: 'Linked List', url: 'https://leetcode.com/problems/reverse-linked-list/description/', code: 'class Solution { public ListNode reverseList(ListNode head) { ListNode prev=null, curr=head; while (curr!=null) { ListNode next=curr.next; curr.next=prev; prev=curr; curr=next; } return prev; } class ListNode { int val; ListNode next; } }' },
  { topic: 'Tree', url: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/description/', code: 'class Solution { public int maxDepth(TreeNode root) { if (root==null) return 0; return 1 + Math.max(maxDepth(root.left), maxDepth(root.right)); } class TreeNode { int val; TreeNode left; TreeNode right; } }' }
];

async function generate() {
  const results = [];
  for (let i = 0; i < problems.length; i++) {
    console.log(`Processing [${problems[i].topic}]...`);
    
    // V1
    const res1 = await fetch(V1_API, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ problemUrl: problems[i].url, language: 'JAVA', code: problems[i].code }) }).then(r => r.json()).catch(e => ({error: e.message}));
    
    // V2
    const res2 = await fetch(V2_API, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ problemUrl: problems[i].url, language: 'JAVA', code: problems[i].code }) }).then(r => r.json()).catch(e => ({error: e.message}));
    
    results.push({
      topic: problems[i].topic,
      v1: res1,
      v2: res2
    });
  }
  
  fs.writeFileSync('comparison.json', JSON.stringify(results, null, 2));
  console.log('Done! Comparison saved to comparison.json');
}

generate();
