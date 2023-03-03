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

   - User can create multiple post

2. Many to One

   - Post can be own by one user

3. One to One

@OneToMany()
Post can have multiple likes

@ManyToOne()
Likes/Dislikes will be own by a user
