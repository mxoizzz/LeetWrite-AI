const fs = require('fs');
const V2_API = 'http://localhost:8081/api/v1/generate';

async function test() {
    const data = { 
        problemUrl: 'https://leetcode.com/problems/two-sum/description/', 
        language: 'JAVA', 
        code: 'class Solution { public int[] twoSum(int[] nums, int target) { return new int[]{0,1}; } }' 
    };

    console.log("Sending request to V2 backend...");
    const res = await fetch(V2_API, { 
        method: 'POST', 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(data) 
    }).then(r => r.json()).catch(e => ({error: e.message}));
    
    console.log("=== V2 RESPONSE ===");
    console.log(JSON.stringify(res, null, 2));
}

test();
