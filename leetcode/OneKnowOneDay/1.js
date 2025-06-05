/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  const stk = new Set()
  let maxLen = 0,tmp = 0
  for(let item of s){
      if(!stk.has(item)){
          tmp ++
      }
      else{
          maxLen = maxLen > tmp ? maxLen : tmp
          stk.clear()
          tmp = 1
      }
      stk.add(item)
  }
  if(s.length === 1){return 1}
  else{return maxLen}
};