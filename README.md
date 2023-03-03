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

1. @OneToOne

   - `User` can have one `photo`
   - `Post` will own 1 `like`
   - `Like` can be own by 1 `post`

2. @OneToMany

   - `User` can create multiple `posts`
   - `Likes` can have multiple `users`

3. @ManyToOne

   - `Posts` can be own by one `user`
   - `Users` can be own by one `likes`

@OneToMany()
Post can have multiple likes

@ManyToOne()
Likes/Dislikes will be own by a user
