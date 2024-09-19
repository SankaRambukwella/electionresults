// Update overall votes
document.getElementById('updateVotesBtn').onclick = function() {
    const candidate = document.getElementById('candidateSelect').value;
    const votes = parseInt(document.getElementById('votesInput').value, 10);

    if (votes >= 0 && candidate >= 1 && candidate <= 3) {
        const currentVotes = parseInt(localStorage.getItem("candidate" + candidate + "Votes")) || 0;
        localStorage.setItem("candidate" + candidate + "Votes", currentVotes + votes);
        document.getElementById('message').innerText = 'Overall votes updated successfully!';
        updateVoteDisplay();
    } else {
        alert("Please enter a valid number of votes.");
    }
};

// Clear overall votes
document.getElementById('clearVotesBtn').onclick = function() {
    const candidate = document.getElementById('candidateSelect').value;
    localStorage.setItem("candidate" + candidate + "Votes", 0);
    document.getElementById('message').innerText = 'Votes cleared successfully!';
};

// Edit overall votes
document.getElementById('editVotesBtn').onclick = function() {
    const candidate = document.getElementById('editCandidateSelect').value;
    const votes = parseInt(document.getElementById('editVotesInput').value, 10);

    if (votes >= 0 && candidate >= 1 && candidate <= 3) {
        localStorage.setItem("candidate" + candidate + "Votes", votes);
        document.getElementById('message').innerText = 'Votes edited successfully!';
    } else {
        alert("Please enter a valid number of votes.");
    }
};

// Update District Votes
document.getElementById('updateDistrictVotesBtn').onclick = function() {
    const district = document.getElementById('districtSelect').value;
    const candidate = document.getElementById('districtCandidateSelect').value;
    const votes = parseInt(document.getElementById('districtVotesInput').value, 10);

    if (votes >= 0 && candidate >= 1 && candidate <= 3) {
        const currentDistrictVotes = parseInt(localStorage.getItem(`${district}_candidate${candidate}Votes`)) || 0;
        localStorage.setItem(`${district}_candidate${candidate}Votes`, currentDistrictVotes + votes);
        document.getElementById('districtMessage').innerText = 'District votes updated successfully!';
        updateDistrictVoteDisplay();
    } else {
        alert("Please enter a valid number of votes.");
    }
};

// Clear District Votes
document.getElementById('clearDistrictVotesBtn').onclick = function() {
    const district = document.getElementById('districtSelect').value;
    const candidate = document.getElementById('districtCandidateSelect').value;
    localStorage.setItem(`${district}_candidate${candidate}Votes`, 0);
    document.getElementById('districtMessage').innerText = 'District votes cleared successfully!';
};

// Edit District Votes
document.getElementById('editDistrictVotesBtn').onclick = function() {
    const district = document.getElementById('editDistrictSelect').value;
    const candidate = document.getElementById('editCandidateSelect').value;
    const votes = parseInt(document.getElementById('editDistrictVotesInput').value, 10);

    if (votes >= 0 && candidate >= 1 && candidate <= 3) {
        localStorage.setItem(`${district}_candidate${candidate}Votes`, votes);
        document.getElementById('districtMessage').innerText = 'District votes edited successfully!';
    } else {
        alert("Please enter a valid number of votes.");
    }
};

// Update display functions
function updateVoteDisplay() {
    for (let i = 1; i <= 3; i++) {
        const votes = localStorage.getItem("candidate" + i + "Votes") || 0;
        console.log("Candidate " + i + " Votes: " + votes);
    }
}

function updateDistrictVoteDisplay() {
    const district = document.getElementById('districtSelect').value;
    for (let i = 1; i <= 3; i++) {
        const votes = localStorage.getItem(`${district}_candidate${i}Votes`) || 0;
        console.log(`District ${district} - Candidate ${i} Votes: ${votes}`);
    }
}

// Initial display
updateVoteDisplay();
updateDistrictVoteDisplay();
