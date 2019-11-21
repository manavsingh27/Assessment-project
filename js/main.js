$(document).ready(function(){
  $('#searchUser').on('keyup', function(e){
    let username = e.target.value;

    // Make request to Github
    $.ajax({
        url:'https://api.github.com/users/'+username,
        data:{
          client_id:'b9315bcd5a07fcd759d8',
          client_secret:'a2b698bf7e7c02f898197cf136d1a41f704ca8e4'
        }
    }).done(function(user){
      $.ajax({
        url:'https://api.github.com/users/'+username+'/repos',
        data:{
          client_id:'b9315bcd5a07fcd759d8',
          client_secret:'a2b698bf7e7c02f898197cf136d1a41f704ca8e4',
          sort: 'created: asc',
          per_page: 5
        }
      }).done(function(repos){
        $.each(repos, function(index, repo){
          $('#repos').append(`
            <div class="card prof">
              <div class="row">
                <div class="col-md-7 text-white">
                  <strong>${repo.name}</strong>: ${repo.description}
                </div>
                <div class="col-md-3">
                  <span class="badge badge-dark">Forks: ${repo.forks_count}</span>
                  <span class="badge badge-primary">Watchers: ${repo.watchers_count}</span>
                  <span class="badge badge-success">Stars: ${repo.stargazers_count}</span>
                </div>
                <div class="col-md-2">
                  <a href="${repo.html_url}" target="_blank" class="btn btn-dark hov">Repo Page</a>
                </div>
              </div>
            </div>
          `);
        });
      });
      $('#profile').html(`
        <div class="card border-primary mb-3 prof" style="max-width: 100rem;">
          <div class="card-header"><h1 class="ml-sm-5 text-white font-weight-bold" style="font-family: 'Courier10 BT'">${user.name}</h1></div>
          <div class="card-body">
            <div class="row">
            <div class="col-md-3">
              <img class="img-thumbnail avatar" src="${user.avatar_url}">
              <a target="_blank" class="btn btn-primary btn-block hov" href="${user.html_url}">View Profile</a>
            </div>
            <div class="col-md-9">
              <span class="badge badge-dark hov">Public Repos: ${user.public_repos}</span>
              <span class="badge badge-primary hov">Public Gits: ${user.public_gists}</span>
              <span class="badge badge-success hov"><a href="https://github.com/${username}/followers" target="_blank" class="text-white">Followers: ${user.followers}</a></span>
              <span class="badge badge-info hov"><a href="https://github.com/${username}/following" target="_blank" class="text-white">Following: ${user.following}</a></span>
              <br><br>
              <ul class="list-group">
                <li class="list-group-item">Company: ${user.company}</li>
                <li class="list-group-item">Website/blog: <a href="${user.blog}" target="_blank">${user.blog}</a></li>
                <li class="list-group-item">Location: ${user.location}</li>
                <li class="list-group-item">Member Since: ${user.created_at}</li>
              </ul>
              </div>
            </div>
          </div>
        </div>
        <h3 class="page-header text-white">Latest Repos</h3>
        <div id="repos"></div>
        `);
    });
  });
});
