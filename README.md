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

2. @OneToMany

   - `User` can create multiple `posts`

3. @ManyToOne

   - `Posts` can be own by one `user`
   - `Users` can be own by one `likes`

4. @ManyToMany
   - `Like` can have multiple `users`
   - `User` can have multiple `likes`

# Hosting

Enter Dokku root
`shh root@159.65.127.20`

`api`
`db` dokku-postgres
`session` dokku-redis
