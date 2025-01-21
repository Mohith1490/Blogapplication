import { defineQuery } from "next-sanity";

export const STARTUP_QUERY = defineQuery( `*[_type == 'startup' && defined(slug.current) && (
  !defined($search) || 
  title match $search || 
  category match $search || 
  author->name match $search
)] | order(_createdAt desc) {
  _id,
  title,
  slug,
  _createdAt,
  author -> {
    _id,
    name,
    image,
    bio
  },
  views,
  description,
  category,
  image
}
`)

export const STARTUP_BY_ID_QUERY = defineQuery(`*[_type == 'startup' && _id == $id][0]{
  _id,
  title,
  slug,
  _createdAt,
  author -> {
    _id,
    name,
    image,
    bio,
    username
  },
  views,
  description,
  category,
  image,
  pitch
}`)

export const STRATUP_VIEWS_QUERY = defineQuery(`
  *[_type == 'startup' && _id == $id][0]{
  _id,views}
  `)

export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`
  *[_type == 'auhtor' && _id == $id][0]{
  _id,
  id,
  username,
  email,
  name,
  image,
  bio
  }
  `)