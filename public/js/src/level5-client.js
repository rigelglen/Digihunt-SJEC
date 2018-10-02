axios.get(`/getLevels/${localStorage.id}`).then((response) => {
    localStorage.levels = JSON.stringify(response.data.userArray.levels);
    if (JSON.parse(localStorage.levels)[4]) {
        document.querySelector('.completed').style.display = 'inline';
    }
});

let button = document.querySelector('#submitCode');
let inp = document.querySelector('#code');



button.addEventListener('click', () => {
    if (inp.value.trim().length > 4) {
        document.querySelector(".overlay").style.display = 'flex';
        axios.post('/level5/auth', {
            code: inp.value.trim()
        }).then((response) => {
            console.log(`Status is ${response.data.message}`);
            console.log(`Code is ${response.data.code}`);

            document.querySelector(".overlay").style.display = 'none';
            localStorage.setItem("id", response.data.id);
            localStorage.setItem("levels", JSON.stringify(response.data.userArray.levels));
            window.location.href = './level6';
        }).catch((err) => {
            swal('Error', 'Wrong code', 'error');
            document.querySelector(".overlay").style.display = 'none';
        });
    } else {
        swal('Error', 'Incorrect input', 'error');
    }
});

$(document).ready(function() {
    // Variables
    let code = 'knock-knock'
	var holding = [],
		moves,
		disksNum = 6,
		minMoves = 63,
		$canves = $('#canves'),
		$restart = $canves.find('.restart'),
		$tower = $canves.find('.tower'),
		$scorePanel = $canves.find('#score-panel'),
		$movesCount = $scorePanel.find('#moves-num'),
		$ratingStars = $scorePanel.find('i'),
		rating = 3;
	
	// Set Rating and final Score
	function setRating(moves) {
		if (moves === 127) {
			$ratingStars.eq(2).removeClass('fa-star').addClass('fa-star-o');
			rating = 2;
		} else if (moves >= 128 && moves <= 228) {
			$ratingStars.eq(1).removeClass('fa-star').addClass('fa-star-o');
			rating = 1;
		} else if (moves >= 229) {
			$ratingStars.eq(0).removeClass('fa-star').addClass('fa-star-o');
			rating = 0;
		}	
		return { score: rating };
	};

	// Init Game
	function initGame(tower) {
		$tower.html('');
		moves = 0;
		$movesCount.html(0);
		holding = [];
		for (var i = 1; i <= disksNum; i++) {
			tower.prepend($('<li class="disk disk-' + i + '" data-value="' + i + '"></li>'));
		}
		$ratingStars.each(function() {
			$(this).removeClass('fa-star-o').addClass('fa-star');
		});
	}

	// Game Logic
	function countMove() {
		moves++;
		$movesCount.html(moves);

		if (moves > minMoves - 1) {
			if ($tower.eq(1).children().length === disksNum || $tower.eq(2).children().length === disksNum) {
                swal('Sucess', 'The code is ' + code, 'info');				
			}
		}
		
		setRating(moves);
	}

	function tower(tower) {
		var $disks = tower.children(),
			$topDisk = tower.find(':last-child'),
			topDiskValue = $topDisk.data('value'),
			$holdingDisk = $canves.find('.hold');

		if ($holdingDisk.length !== 0) {
			if (topDiskValue === holding[0]) {
				$holdingDisk.removeClass('hold');
			} else if (topDiskValue === undefined || topDiskValue > holding[0]) {
				$holdingDisk.remove();
				tower.append($('<li class="disk disk-' + holding[0] + '" data-value="' + holding[0] + '"></li>'));
				countMove();
			}
		} else if ($topDisk.length !== 0) {
			$topDisk.addClass('hold');
			holding[0] = topDiskValue;
		}
	}
	
	initGame($tower.eq(0));
	
	// Event Handlers
	$canves.on('click', '.tower', function() {
		var $this = $(this);
		tower($this);
	});
	
	$restart.on('click', function() {
		swal({
				allowEscapeKey: false,
				allowOutsideClick: false,
				title: 'Are you sure?',
				text: "Your progress will be Lost!",
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#8bc34a',
				cancelButtonColor: '#e91e63',
				confirmButtonText: 'Yes, Restart Game!'
		}).then(function(isConfirm) {
				if (isConfirm) {
					initGame($tower.eq(0));
				}
			})
	});
});


// var containerElement = document.getElementById("market");

// var containerMonitor = scrollMonitor.createContainer(containerElement);
// // this containerMonitor is an instance of the scroll monitor
// // that listens to scroll events on your container.

// var popupSection1 = document.getElementById("popupSection1");
// var popupSection1Watcher = containerMonitor.create(popupSection1, -150);

// popupSection1Watcher.enterViewport(function () {
//     alert('EXTRA EXTRA EXTRA BUY NOW FOR ONLY 100 SHMECKLES!!!!!!');
//     swal('EMERGENCY ALERT', 'EXTRA EXTRA EXTRA BUY NOW FOR ONLY 100 SHMECKLES!!!!!!', 'info').then(() => {
//         swal('EMERGENCY ALERT', 'EXTRA EXTRA EXTRA BUY NOW FOR ONLY 100 SHMECKLES!!!!!!', 'info');
//     }).then(() => {
//         swal('EMERGENCY ALERT', 'BUY NOWWWW!!!!!!!!!!!!', 'info');
//     }).then(() => {
//         swal('EMERGENCY ALERT', 'EXTRA EXTRA EXTRA BUY NOW FOR ONLY 100 SHMECKLES!!!!!!', 'info');
//     });
// });
// popupSection1Watcher.exitViewport(function () {
//     alert('DO NOT LEAVE ');
//     alert('SPECIAL OFFER IF YOU DO NOT LEAVE');
//     alert('BUY FOR JUST 50 SHMECKLES');
//     confirm('ARE YOU SURE YOU WANT TO LEAVE');
// });