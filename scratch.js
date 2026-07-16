const fs = require('fs');

const API_URL = 'https://leetwrite-ai.onrender.com/api/v1/generate';

const problems = [
  {
    url: 'https://leetcode.com/problems/gcd-of-odd-and-even-sums/description/',
    code: `class Solution {
    public int gcdOfOddEvenSums(int n) {
        return n;
    }
}`
  },
  {
    url: 'https://leetcode.com/problems/find-numbers-with-even-number-of-digits/description/',
    code: `class Solution {
    public int findNumbers(int[] nums) {
        int count = 0;
        for(int n : nums){
            if(String.valueOf(n).length() % 2 == 0){
                count++;
            }
        }
        return count;
    }
}`
  },
  {
    url: 'https://leetcode.com/problems/sum-of-gcd-of-formed-pairs/description/',
    code: `class Solution {
    private int gcd(int a, int b){
        while(b!=0){
            int temp = b;
            b = a%b;
            a = temp;
        }
        return Math.abs(a);
    }
    public long gcdSum(int[] nums) {
        int[] mx = new int[nums.length];
        mx[0] = nums[0];
        for(int i = 1;i<nums.length;i++){
            mx[i] = Math.max(mx[i-1],nums[i]);
        }
        int[] prefixGcd = new int[nums.length];
        for(int i = 0;i<nums.length;i++){
            prefixGcd[i] = gcd(nums[i],mx[i]);
        } 
        Arrays.sort(prefixGcd);
        int i = 0,j = nums.length-1;
        long sum = 0;
        while(i<j){
            sum+=gcd(prefixGcd[i],prefixGcd[j]);
            i++;
            j--;
        }
        return sum;
    }
}`
  },
  {
    url: 'https://leetcode.com/problems/contains-duplicate/description/',
    code: `class Solution {
    public boolean containsDuplicate(int[] nums) {
        HashSet<Integer> seen = new HashSet<>();
        for(int num: nums){
            if(seen.contains(num)){
                return true;
            }
            seen.add(num);
        }
        return false;
    }
}`
  },
  {
    url: 'https://leetcode.com/problems/maximum-number-of-words-found-in-sentences/description/',
    code: `class Solution {
    public int mostWordsFound(String[] sentences) {
        int max = 0;

        for (String sentence : sentences) {
            int count = 1;
            for (int i = 0; i < sentence.length(); i++) {
                if (sentence.charAt(i) == ' ') {
                    count++;
                }
            }
            max = Math.max(max, count);
        }

        return max;
    }
}`
  }
];

async function generate() {
  const results = [];
  for (let i = 0; i < problems.length; i++) {
    console.log(`Generating for problem ${i + 1}...`);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemUrl: problems[i].url,
          language: "JAVA",
          code: problems[i].code
        })
      });
      const data = await response.json();
      results.push({ ...data, _url: problems[i].url, _code: problems[i].code });
    } catch (e) {
      console.error(e);
      results.push({ error: e.message });
    }
  }
  fs.writeFileSync('output.json', JSON.stringify(results, null, 2));
  console.log('Done! Saved to output.json');
}

generate();
