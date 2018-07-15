// 연습생 이름은 띄어쓰기 없이 정확히 입력!!!
var trainees = [
	"연습생1", "연습생2", "연습생3", "연습생4", "연습생5", "연습생6",
  "연습생7", "연습생8", "연습생9", "연습생10", "연습생11", "연습생12"
];

var userId = 'G마켓 아이디', password = '패스워드';

var casper = require('casper').create({
	verbose: true, logLevel: "debug"
});

casper.start('https://mobile.gmarket.co.kr/Login/Login', function() {
	this.fill('#defaultForm', {
    	'id': userId,
    	'pwd': password
   	}, true);
});

casper.wait(1000);
casper.thenOpen("http://m.gmarket.co.kr/event/2018/06/0601_produce/vote.asp");
casper.then(function() {
    this.evaluate(function(trainees) {
		$('#divVoteList').find('ul').find('li').find('a').each(function(e) { 
		    var name = $(this).find('span.name').text().replace(/\s/gi, "");
		    if (trainees.indexOf(name) > -1) {
		    	$(this).trigger('click');	
		    }
		});
    }, trainees);
});	

casper.wait(1000);
casper.thenClick('.return_vote a');
casper.thenClick('.btn_confirm');

casper.wait(5000);
casper.then(function() {
	this.capture('capture.png');
});

casper.run();