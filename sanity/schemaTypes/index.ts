import post from "./post";
import category from "./category";
import tag from "./tag";
import author from './author';
import photoStory from './photoStory';
import videoStory from './videoStory';
import podcast from './podcast';
import blockContent from './blockContent';

export const schema = {
  types: [post, category, tag, author, photoStory, videoStory, podcast, blockContent],
};
