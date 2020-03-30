import EpisodeList from './EpisodeList';
import ReactDOM from 'react-dom';
import videojs from 'video.js';

const vjsComponent = videojs.getComponent('Component');

class vjsEpisodeList extends vjsComponent {

    constructor(player, options) {
        super(player, options);

        /* Bind the current class context to the mount method */
        this.mount = this.mount.bind(this);

        /* When player is ready, call method to mount React component */
        player.ready(() => {
            this.mount();
        });

        /* Remove React root when component is destroyed */
        this.on("dispose", () => {
            ReactDOM.unmountComponentAtNode(this.el())
        });
    }

    /**
     * We will render out the React EpisodeList component into the DOM element
     * generated automatically by the VideoJS createEl() method.
     *
     * We fetch that generated element using `this.el()`, a method provided by the
     * vjsComponent class that this class is extending.
     */
    mount() {
        ReactDOM.render(<EpisodeList vjsComponent={this} body="Episodes" />, this.el() );
    }
}

/**
 * Make sure to register the vjsComponent so Video JS knows it exists
 */
vjsComponent.registerComponent('vjsEpisodeList', vjsEpisodeList);

export default vjsEpisodeList;


/**
 * VideoPlayer.js
 * Check the above example for how to integrate the rest of this class.
 */

// ...
componentDidMount() {
    // instantiate Video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
        console.log('onPlayerReady', this)
    });

    /**
     * Fetch the controlBar component and add the new vjsEpisodeList component as a child
     * You can pass options here if desired in the second object.
     */
    this.player.getChild('controlBar').addChild('vjsEpisodeList', {});
}