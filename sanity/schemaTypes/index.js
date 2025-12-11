import post from "./post.js";
import category from "./category.js";
import tag from "./tag.js";
import author from './author.js';
import photoStory from './photoStory.js';
import videoStory from './videoStory.js';
import podcast from './podcast.js';

export const schema = {
  types: [post, category, tag, author, photoStory, videoStory, podcast],
};
