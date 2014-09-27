//This code parses the output of a pattr object bound to a live.step object
//Tiago Ângelo (aka p1nh0) Sep2014

var pattrList; // is the whole list coming from pattr that we wish to parse
var nseq; // live.step attribute nseq (number of sequences, in the case of qathan.sequencer there are 4 sequences: A, B, C and D)
var nstep; // live.step attribute nstep (number of steps in the current sequence)

inlets = 1;
outlets = 5;
setinletassist(4, "live.step header");
setinletassist(3, "seq N");
setinletassist(2, "seq N steps");
setinletassist(1, "seq N header");
setinletassist(0, "seq N step data");

function list(l){
	pattrList = arrayfromargs(messagename, arguments); // get message arguments
	nseq = pattrList[0]; // parse nseq attribute
	
	//get nstep for each sequence
	nstep = new Array(nseq);
	for (i = 0; i < nseq; i++){
		nstep[i] = pattrList[1+(i*2)];
	}
	
	//output live.step header
	outlet(4, pattrList.slice(0, 1 + nseq*2));
	pattrList = pattrList.slice(nseq*2 + 1); // remove pattrList header
	
	//parse sequences
    for(j = 0; j < nseq; j++ ){
		
		//output seq N
		outlet(3, j+1);
		
		// output sequence N steps
		outlet(2, nstep[j]); 
		
		// output sequence N header
		outlet(1, pattrList.slice(0, 8)); 
		pattrList.splice(0, 8); 
		
		//output sequence N step data
		outlet(0, pattrList.slice(0, 5*nstep[j]));
		pattrList.splice(0, 5*nstep[j]);
		
		// eliminate current seq before proceeding to next seq
		//pattrList.splice(0, 8 + 5*nstep[j]);
	}
}


