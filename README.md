# Features

- Register ✔
- Login ✔
- Forgot Password ✔
- Session ✔
- Create Post ✔
- Read Post ✔
- Update Post
- Delete Post
- Single Post
- Amazon S3 Bucket ✔
- Add/Update profile picture ✔
- Update profile info ✔
- Update password ✔
- Like/Dislike a post

# Relations (Bi-directional approach)

1. One to Many

   - `User` can create multiple `posts`
   - `Post` can have multiple `likes`

2. Many to One

   - `Posts` can be own by one `user`
   - `Likes` can be own by one `post`

3. One to One
   - User can have one photo

@OneToMany()
Post can have multiple likes

@ManyToOne()
Likes/Dislikes will be own by a user
