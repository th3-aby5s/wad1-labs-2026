"use strict";
import logger from "../utils/logger.js";
import playlistStore from "../models/playlist-store.js";
import userStore from "../models/user-store.js";
import accounts from './accounts.js';

const stats = {
    createView(request, response) {
        const loggedInUser = accounts.getCurrentUser(request);

        if (loggedInUser) {
            logger.info("Stats page loading!");

            // app statistics calculations
            const playlists = playlistStore.getAllPlaylists();
            const users = userStore.getAllUsers();

            let numPlaylists = playlists.length;

            let numUsers = users.length;

            let numSongs = playlists.reduce((total, playlist) => total + playlist.songs.length, 0);

            let average = numPlaylists > 0 ? (numSongs / numPlaylists).toFixed(2) : 0;

            let maxRating = Math.max(...playlists.map(playlist => playlist.rating));
            let maxRated = playlists.filter(playlist => playlist.rating === maxRating);
            let favTitles = maxRated.map(item => item.title);

            let totalRating = playlists.reduce((total, playlist) => total + parseInt(playlist.rating), 0);
            let avgRating = numPlaylists > 0 ? totalRating / numPlaylists : 0;

            let mostSongs = Math.max(...playlists.map(playlist => playlist.songs.length));
            let largestPlaylist = playlists.filter(playlist => playlist.songs.length === mostSongs);
            let largestTitles = largestPlaylist.map(item => item.title);

            const statistics = {
                displayNumUsers: numUsers,
                displayNumPlaylists: numPlaylists,
                displayNumSongs: numSongs,
                displayAverage: average,
                highest: maxRating,
                displayFav: favTitles,
                displayAvgRating: avgRating.toFixed(2),
                largest: mostSongs,
                displayLargest: largestTitles,
            }

            const viewData = {
                title: "Playlist App Statistics",
                stats: statistics,
                fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
                picture: loggedInUser.picture,
            };

            response.render("stats", viewData);
        }
        else response.redirect('/');
    },
    
};

export default stats;