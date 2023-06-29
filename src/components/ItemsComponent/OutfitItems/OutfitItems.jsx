import React, { useEffect, useRef, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa';
import Card from './Card/Card.jsx';

import './OutfitItems.css';

const OutfitItems = ({ currItem }) => {
  const [savedItemsId, setSavedItemsId] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [reachMaxScroll, setReachMaxScroll] = useState(false);

  // Load localStorage
  useEffect(() => {
    const retreivedIds = JSON.parse(localStorage.getItem('outfit'));
    if (retreivedIds.length > 0) {
      setSavedItemsId(retreivedIds);
    }
  }, []);

  // Set savedItemsId to localStorage
  useEffect(() => {
    localStorage.setItem('outfit', JSON.stringify(savedItemsId));
  }, [savedItemsId]);

  ////////////////////////////////////////////
  ////////////// CAROUSEL LOGIC //////////////
  ////////////////////////////////////////////
  const outfitListRef = useRef(null);
  /// helper functions
  const hasReachedMaxScroll = () =>
    scrollPosition + outfitListRef.current.clientWidth + 100 >=
    outfitListRef.current.scrollWidth;

  const scrollTo = (position) => {
    outfitListRef.current.scrollTo({
      left: position,
      behavior: 'smooth',
    });
  };

  //// Main functions
  const scrollRight = () => {
    // Check to see if max scroll
    if (hasReachedMaxScroll()) {
      setReachMaxScroll(true);
      return;
    }
    const newScrollPosition = scrollPosition + 220;
    setScrollPosition(newScrollPosition);

    // Scroll the list to the new position.
    if (outfitListRef.current) {
      scrollTo(newScrollPosition);
    }
  };

  const scrollLeft = () => {
    const newScrollPosition = scrollPosition - 220;
    setScrollPosition(newScrollPosition);
    if (outfitListRef.current) {
      scrollTo(newScrollPosition);
    }
  };

  ///Check to see if at end of carousel, move to beginning if less than 2 items
  useEffect(() => {
    const maxScrollReached = hasReachedMaxScroll();
    setReachMaxScroll(maxScrollReached);
    if (savedItemsId.length <= 2) setScrollPosition(0);
  }, [scrollPosition, savedItemsId]);

  ////////////// ADD OUTFIT HANDLER //////////////
  const handleAddItem = () => {
    const canAdd = savedItemsId.some((id) => id === currItem.id);
    (!canAdd || savedItemsId.length === 0) &&
      setSavedItemsId((prevState) => [currItem.id, ...prevState]);
  };

  ////////////// RENDER ELEMENTS //////////////
  const renderAddItemButton = () => (
    <button className="items-comp--outfit-add_btn" onClick={handleAddItem}>
      Add Item +
    </button>
  );

  const renderCards = () =>
    savedItemsId.map((product) => (
      <Card
        productID={product}
        key={product}
        savedItemsId={savedItemsId}
        setSavedItemsId={setSavedItemsId}
      />
    ));

  const renderLeftArrow = () =>
    scrollPosition > 0 && (
      <button
        className="items-comp--outfit-list_btn left"
        type="button"
        onClick={scrollLeft}
      >
        <FaArrowLeft size="1rem" />
      </button>
    );

  const renderRightArrow = () =>
    !reachMaxScroll &&
    savedItemsId.length > 2 && (
      <button
        className="items-comp--outfit-list_btn right"
        type="button"
        onClick={scrollRight}
      >
        <FaArrowRight size="1rem" />
      </button>
    );

  ////////////// JSX //////////////
  if (savedItemsId.length === 0) {
    return (
      <div className="items-comp--outfit-container">
        <ul className="items-comp--outfit-list" ref={outfitListRef}>
          {renderAddItemButton()}
        </ul>
      </div>
    );
  }
  return (
    <div
      className={`items-comp--outfit-container ${
        savedItemsId.length > 2 ? 'fade' : ''
      }`}
    >
      {renderLeftArrow()}
      <ul className="items-comp--outfit-list" ref={outfitListRef}>
        {renderAddItemButton()}
        {renderCards()}
      </ul>
      {renderRightArrow()}
    </div>
  );
};

export default OutfitItems;
