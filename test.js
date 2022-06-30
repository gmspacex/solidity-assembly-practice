// Count all trigrams in a string and display results if they appear more than once.
// Trigram is a sequence of any three letters eg. 
// - In “pxcpxcb”  "pxc" appeared 2x 
// - in "aaaa" "aaa" appeared 2x
// - "abba" nothing to display.

const showTriagram = (str) => {
	const wordCount = {} // word: string => word count: number
	const triagrams = []
	for (let i = 0; i < str.length - 2; i++) {
		const trigram = str.substring(i, i + 3); // get trigram at index i
		if (wordCount[trigram]) {
			triagrams.push(trigram)
			wordCount[trigram]++;
		} else {
			wordCount[trigram] = 1
		}
	}

	for (let i = 0; i < triagrams.length; i++) {
		console.log(triagrams[i], wordCount[triagrams]);
	}

	if (triagrams.length == 0) {
		console.log("none")
	}
}

showTriagram("pxcpxcb")
showTriagram("aaaa")
showTriagram("abba")