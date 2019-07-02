const form = document.getElementById('vote-form');
const form2 = document.getElementById('vote-form-2');
const form3 = document.getElementById('vote-form-3');
const form4 = document.getElementById('vote-form-4');

var event;

form.addEventListener('submit', e=>{
    
    const choice1 = document.querySelector('input[name=os1]:checked').value;
    const data1 = {os: choice1};

    fetch('http://localhost:3000/poll',{
        method: 'post',
        body: JSON.stringify(data1),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => res.json())
    .catch(err => console.log(err));

    e.preventDefault();
});

form2.addEventListener('submit', e=>{
    
    const choice2 = document.querySelector('input[name=os2]:checked').value;
    const data2 = {os: choice2};

    fetch('http://localhost:3000/poll',{
        method: 'post',
        body: JSON.stringify(data2),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => res.json())
    .catch(err => console.log(err));

    e.preventDefault();
});

form3.addEventListener('submit', e=>{
    
    const choice3 = document.querySelector('input[name=os3]:checked').value;
    const data3 = {os: choice3};

    fetch('http://localhost:3000/poll',{
        method: 'post',
        body: JSON.stringify(data3),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => res.json())
    .catch(err => console.log(err));

    e.preventDefault();
});

form4.addEventListener('submit', e=>{
    
    const choice4 = document.querySelector('input[name=os4]:checked').value;
    const data4 = {os: choice4};

    fetch('http://localhost:3000/poll',{
        method: 'post',
        body: JSON.stringify(data4),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => res.json())
    .catch(err => console.log(err));

    e.preventDefault();
});


fetch("http://localhost:3000/poll")
    .then(res => res.json())
    .then(data => {
        let votes = data.votes;
        let totalVotes = votes.length;
        document.querySelector('#chartTitle').textContent = `Total Votes: ${totalVotes}`;

        let voteCounts = {
            Happy: 1,
            Confused: 1,
            Sad: 1,
            Mad: 1
        };

        voteCounts = votes.reduce((acc, vote) => (
            (acc[vote.os] = (acc[vote.os] || 0) + parseInt(vote.points)), acc),
            {}
        );

        let dataPoints = [
            { label: 'Happy', y: voteCounts.Happy },
            { label: 'Confused', y: voteCounts.Confused },
            { label: 'Sad', y: voteCounts.Sad },
            { label: 'Mad', y: voteCounts.Mad }
        ];
            
        const chartContainer = document.querySelector('#chartContainer');
        
        if(chartContainer){

            // Listen for the event.
            document.addEventListener('votesAdded', function (e) { 
                document.querySelector('#chartTitle').textContent = `Total Votes: ${e.detail.totalVotes}`;
            });
            
            const chart = new CanvasJS.Chart('chartContainer', {
                animationEnabled: true,
                theme: 'theme1',
                data:[
                    {
                        type: 'column',
                        dataPoints: dataPoints
                    }
                ]
            });
            chart.render();
        
             // Enable pusher logging - don't include this in production
             Pusher.logToConsole = true;
        
             var pusher = new Pusher('6965035497b7b1ae0181', {
                //original app key 355bbcc1238451dd1d93
               cluster: 'us2',
               //original cluster ap2
               encrypted: true
             });
         
             var channel = pusher.subscribe('os-poll');

             channel.bind('os-vote', function(data) {
               dataPoints.forEach((point)=>{
                   if(point.label==data.os)
                   {
                        point.y+=data.points;
                        totalVotes+=data.points;
                        event = new CustomEvent('votesAdded',{detail:{totalVotes:totalVotes}});
                        // Dispatch the event.
                        document.dispatchEvent(event);
                   }
               });
               chart.render();
             });
        }

});
