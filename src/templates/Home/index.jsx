import { Component } from 'react';
 import { useCallback, useEffect, useState } from 'react';

 import './styles.css';

 @@ -7,89 +7,76 @@ import { loadPosts } from '../../utils/load-posts'
 import { Button } from '../../components/Button';
 import { TextInput } from '../../components/TextInput';

 export class Home extends Component {
   state = {
     posts: [],
     allPosts: [],
     page: 0,
     postsPerPage: 10,
     searchValue: ''
   };

   async componentDidMount() {
     await this.loadPosts();
   }

   loadPosts = async () => {
     const { page, postsPerPage } = this.state;
     export const Home = () => {
   const [posts, setPosts] = useState([]);
   const [allPosts, setAllPosts] = useState([]);
   const [page, setPage] = useState(0);
   const [postsPerPage] = useState(2);
   const [searchValue, setSearchValue] = useState('');

   const handleLoadPosts = useCallback(async (page, postsPerPage) => {
     const postsAndPhotos = await loadPosts();
     this.setState({
       posts: postsAndPhotos.slice(page, postsPerPage),
       allPosts: postsAndPhotos,
     });
   }

     setPosts(postsAndPhotos.slice(page, postsPerPage));
     setAllPosts(postsAndPhotos);
   }, []);

   useEffect(() => {
     console.log(new Date().toLocaleString('pt-BR'));
     handleLoadPosts(0, postsPerPage);
   }, [handleLoadPosts, postsPerPage]);

   loadMorePosts = () => {
     const {
       page,
       postsPerPage,
       allPosts,
       posts
     } = this.state;
   const loadMorePosts = () => {
     const nextPage = page + postsPerPage;
     const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
     posts.push(...nextPosts);

     this.setState({ posts, page: nextPage });
     setPosts(posts);
     setPage(nextPage);
   }

   handleChange = (e) => {
   const handleChange = (e) => {
     const { value } = e.target;
     this.setState({ searchValue: value });
     setSearchValue(value);
   }

   render() {
     const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
     const noMorePosts = page + postsPerPage >= allPosts.length;

     const filteredPosts = !!searchValue ?
       allPosts.filter(post => {
         return post.title.toLowerCase().includes(
           searchValue.toLowerCase()
         );
       })
       : posts;
   const noMorePosts = page + postsPerPage >= allPosts.length;
   const filteredPosts = !!searchValue ?
     allPosts.filter(post => {
       return post.title.toLowerCase().includes(
         searchValue.toLowerCase()
       );
     })
     : posts;

   return (
     <section className="container">
       <div className="search-container">
         {!!searchValue && (
           <h1>Search value: {searchValue}</h1>
         )}

     return (
       <section className="container">
         <div class="search-container">
           {!!searchValue && (
             <h1>Search value: {searchValue}</h1>
           )}
         <TextInput searchValue={searchValue} handleChange={handleChange} />
       </div>

           <TextInput searchValue={searchValue} handleChange={this.handleChange} />
         </div>
       {filteredPosts.length > 0 && (
         <Posts posts={filteredPosts} />
       )}

         {filteredPosts.length > 0 && (
           <Posts posts={filteredPosts} />
         )}
       {filteredPosts.length === 0 && (
         <p>Não existem posts =(</p>
       )}

         {filteredPosts.length === 0 && (
           <p>Não existem posts =(</p>
       <div className="button-container">
         {!searchValue && (
           <Button
             text="Load more posts"
             onClick={loadMorePosts}
             disabled={noMorePosts}
           />
         )}
       </div>
     </section>
   );

         <div className="button-container">
           {!searchValue && (
             <Button
               text="Load more posts"
               onClick={this.loadMorePosts}
               disabled={noMorePosts}
             />
           )}
         </div>
       </section>
     );
   }
 }