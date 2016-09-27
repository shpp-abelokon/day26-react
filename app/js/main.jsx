function myReact(data) {

    var Movie = React.createClass({
      getInitialState: function(){
        return {
          count: 0
        }
      },
      handleClick: function () {
        this.setState({ count: this.state.count + 1  });
      },
        render: function() {
            return (
                <div className="col-md-3 movie">
                    <div className="bg">
                      <img src={this.props.img} className="img-responsive" alt={this.props.title} onClick={this.handleClick}/>
                      <span className="title">
                          {this.props.title}
                      </span>
                      -
                      <span className="year">
                          {this.props.year}
                      </span>
                      <div >{this.props.type}</div>
                      <div className='count ' onClick={this.handleClick}>{this.state.count}</div>
                    </div>

                </div>
            )
        }
    });

    var MoviesList = React.createClass({
        getInitialState: function() {
            return {displayedMovies: data};
        },
        handleSearch: function(event) {
            console.log(event.target.value);
            var searchQuery = event.target.value.toLowerCase();
            var displayedMovies = data.filter(function(el) {
                var searchValue = el.Title.toLowerCase();
                return searchValue.indexOf(searchQuery) !== -1;
            });
            console.log(displayedMovies);
            this.setState({displayedMovies: displayedMovies});
        },
        render: function() {
            return (
                <div>
                    <div className="row block-search">
                        <div className="col-md-offset-4 col-md-4">
                            <input id="search" type="text" className="form-control" placeholder="Select movie posters" onChange={this.handleSearch}/>
                        </div>
                    </div>
                    <div className="row">
                        {
                          this.state.displayedMovies.map(function(el, i) {
                            console.log(el.Title);
                            return <Movie title={el.Title}
                                          key={i}
                                          img={el.Poster}
                                          year={el.Year}
                                          type={el.Type}
                                          />;
                          })
                        }
                    </div>
                </div>
            );
        }
    });

    ReactDOM.render(
        <MoviesList/>, document.getElementById("moviesList"));

};

var getData = (url) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = () => {
            if (xhr.status === 200) {
                let json = JSON.parse(xhr.response);
                console.log(json);
                resolve(json.Search);
            } else {
                reject(xhr.statusText);
            }
        };
        xhr.onerror = (error) => reject(error);

        xhr.send();
    });
}

let search = 'bug';

getData(`http://www.omdbapi.com/?s=${search}`).then(movies => myReact(movies)).catch(error => console.error(error));
