import { useState, useEffect } from "react";

const Search = ({
  searchText,
  setSearchText,
  posts,
  setFilteredPosts,
}: any) => {
  const handleSearchChange = (e: any) => {
    setSearchText(e.target.value);
  };

  // Search filter
  useEffect(() => {
    const terms = searchText?.toLowerCase().split(" ").filter(Boolean);

    if (posts.length > 0) {
      const filtered = posts.filter((post: any) => {
        return terms.every((term: any) => {
          if (term.startsWith("@")) {
            const username = term.slice(1);
            return post.creator.username.toLowerCase().includes(username);
          } else if (term.startsWith("#")) {
            const tag = term.slice(1);
            return post.tag.toLowerCase().includes(tag);
          } else {
            return (
              post.prompt.toLowerCase().includes(term) ||
              post.creator.username.toLowerCase().includes(term) ||
              post.tag.toLowerCase().includes(term)
            );
          }
        });
      });
      setFilteredPosts(filtered);
    }

  }, [searchText, posts]);

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="relative w-full flex justify-center"
    >
      <input
        type="text"
        placeholder="Search for a tag or username"
        value={searchText}
        onChange={handleSearchChange}
        required
        className="search_input peer"
      />
    </form>
  );
};

export default Search;
