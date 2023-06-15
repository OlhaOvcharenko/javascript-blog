{
  'use strict';

  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);

    /*[DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    /*[DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    console.log('clickedElement (with plus): ' + clickedElement);


    /*[DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    /*[DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');

    console.log(articleSelector);

    /*[DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);

    console.log(targetArticle);
      
    /*[DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
  
  };

  const optArticleSelector = '.post';
  const optTitleSelector = '.post-title';
  const optTitleListSelector = '.titles';
  
    
  function generateTitleLinks(customSelector = ''){
    
    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* find all the articles and save them to variable: articles */

    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    let html = '';

    for(let article of articles){

      /* get the article id */
      const articleId = article.getAttribute('id');

      /* find the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      /* get the title from the title element */
      

      /* create HTML of the link */

      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log(linkHTML);
 
      /* insert link into titleList */
      html = html + linkHTML;
    }
  
    titleList.innerHTML = html;
  
    const links = document.querySelectorAll('.titles a');
  
    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }
  
  generateTitleLinks();


  const optArticleTagsSelector = '.post-tags .list';
  const optTagsListSelector ='.tags.list';
  const optCloudClassCount = '4';
  const optCloudClassPrefix = 'tag-size-';
  
  /*NEW*/
  const calculateTagsParams = function (tags){
    const params = {'max': 0, 'min': 999999};

    for (let tag in tags){
      if(tags[tag] > params.max){
        params.max = tags[tag];
      }
      if(tags[tag] < params.min){
        params.min = tags[tag];
      }
      console.log(tag + ' is used ' + tags[tag] + ' times');
    }
    return params;
  };

  const calculateTagClass = function(count, params){
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );

    return optCloudClassPrefix + classNumber;
  }

  function generateTags(){

  
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for(let article of articles){

      /* find tags wrapper */
      const tagsList = article.querySelector(optArticleTagsSelector);

      console.log(tagsList);

      /* make html variable with empty string */
      let html ='';

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log(articleTags);
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log(articleTagsArray);

      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){
        console.log(tag);

        /* generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag + '"><i>' + tag + '</i></a></li>';

        /* add generated code to html variable */
        html += linkHTML;

        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[tag]) {
        /* [NEW] add tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }

      /* END LOOP: for each tag */
      }

      /* insert HTML of all the links into the tags wrapper */
      tagsList.innerHTML = html;
    }
    /* END LOOP: for every article: */

    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);

    /* [NEW] create variable for all links HTML code */
    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
      /* [NEW] generate code of a link and add it to allTagsHTML */
    const tagLinkHTML = calculateTagClass(allTags[tag], tagsParams);
    console.log('tagLinkHTML:', tagLinkHTML);

    allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + tagLinkHTML + '">' + tag + '</a></li>';

    }
    /* [NEW] END LOOP: for each tag in allTags: */

    /* [NEW] select the element representing the tag list in your HTML document */
    const tagList = document.querySelector(optTagsListSelector);

    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
    
  }
  
  generateTags();


  function tagClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();
  
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('Tag was clicked');

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(href);

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
  
    /* find all tag links with class active */
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  
    /* START LOOP: for each active tag link */
    for (let activeTag of activeTags) {
      activeTag.classList.remove('active');
      /* remove class active */
    }
    /* END LOOP: for each active tag link */
  
    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  
    /* START LOOP: for each found tag link */
    for (let tagLink of tagLinks) {
      tagLink.classList.add('active');
      /* add class active */
    }
    /* END LOOP: for each found tag link */
  
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }


  
  function addClickListenersToTags() {
    /* find all links to tags */
    const tagLinks = document.querySelectorAll('.post-tags .list a');
  
    /* START LOOP: for each link */
    for (let tagLink of tagLinks) {
      /* add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);
    }
    /* END LOOP: for each link */
  }
  
  addClickListenersToTags();


  const optArticleAuthorSelector = '.post-author';
  const optAuthorsListSelector = 'author.list.';

  const generateAuthors = function(){
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    for (let article of articles) {
      /* find wrapper for author */
      const authorList = article.querySelector(optArticleAuthorSelector);
      console.log(authorList);

      /* make html variable with empty string */
      let html ='';

      /* get author from data-author attribute */
      const articleAuthor = article.getAttribute('data-author');
      console.log(articleAuthor);
      
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#author-' + articleAuthor + '"><b>' + articleAuthor+ '</b></a></li>';

      /* add generated code to html variable */
      html += linkHTML;
      
      /* insert HTML of all the links into the tags wrapper */
      authorList.innerHTML = html;
    }
  };

  generateAuthors();

  function authorClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();
  
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('Author was clicked');

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(href);

    /* make a new constant "author" and extract author from the "href" constant */
    const author = href.replace('#author-', '');
    console.log(author);

    /* find all author links with class active */
    const activeAuthors = document.querySelectorAll('a.active[href^="#author-');
  
    /* START LOOP: for each active tag link */
    for (let activeAuthor of activeAuthors) {
      activeAuthor.classList.remove('active');
      /* remove class active */
    }
    /* END LOOP: for each active tag link */
  
    /* find all tag links with "href" attribute equal to the "href" constant */
    const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  
    for (let authorLink of authorLinks) {
      authorLink.classList.add('active');
    }
  
    generateTitleLinks('[data-author="' + author + '"]');
  }
  
  function addClickListenersToAuthor() {
    /* find all links to tags */
    const links = document.querySelectorAll('a[href^="#author-"]');
  
    /* START LOOP: for each link */
    for (let link of links) {
      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', authorClickHandler);
    }
    /* END LOOP: for each link */
  }

  addClickListenersToAuthor();



}