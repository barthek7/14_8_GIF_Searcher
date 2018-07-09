App = React.createClass({
    render: function () {
        var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        return (
          <div style={styles}>
                <h1>Wyszukiwarka GIFów!</h1>
                <p>Znajdź gifa na <a href={'http://giphy.com'}>giphy</a>. Naciskaj Enter, aby pobrac kolejne gify.</p>
                <Search
                    onSearch={this.handleSearch}
                />
              <Gif
                  loading={this.state.loading}
                  url={this.state.gif.url}
                  sourceUrl={this.state.gif.sourceUrl}
              />
          </div>
        );
    },
    getInitialState: function () {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
    },
    handleSearch: function (searchingText) {
        this.setState(
            {
                loading: true
            }
        );
        this.getGif(searchingText)
            .then((gif)=>{
                this.setState({
                    loading: false,
                    gif: gif,
                    searchingText: searchingText
                });
            });

    },
    getGif: function(searchingText) {
        const GIPHY_API_URL = 'https://api.giphy.com';
        const GIPHY_PUB_KEY = 'W6PxjQy0sPGCRQPkytP63pVW92XwBdvQ';
        let url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
        return new Promise ((resolve, reject)=>{
            const request = new XMLHttpRequest();
            request.open('GET', url);
            request.onload = () => {
                if (request.status === 200) {
                    let data = JSON.parse(request.responseText).data;
                    let gif = {
                        url: data.fixed_width_downsampled_url,
                        sourceUrl: data.url
                    };
                    resolve(gif);
                }else{
                    reject(new Error(`Error ${this.responseText}`));
                }
            };
                request.send();
        });
    },
});