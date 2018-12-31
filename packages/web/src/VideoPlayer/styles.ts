import styled from 'styled-components';

export const VideoComponent = styled.section`
  background-color: blue;
  padding: 5px;
  position: relative;

  video {
    max-width: 100%;
    min-width: 100%;
  }

  .url {
    font-size: 12px;
  }
`;

export const ClipsComponent = styled.nav`
  display: flex;

  > button {
    cursor: pointer;
  }
`;

export const ClipComponent = styled.div`
  position: relative;

  &:hover > .data {
    opacity: 1;
  }

  .data {
    background-color: rgba(255, 255, 255, 0.7);
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    opacity: 0;
    transition: transform opacity 0.3s easy-out;
    list-style: none;
    margin: 0;
    padding: 16px;
    text-align: left;
    font-size: 12px;

    > li {
      > span {
        font-weight: bold;
      }
    }
  }

  .actions {
    position: absolute;
    bottom: 16px;
    left: 16px;

    a,
    button {
      border: 1px solid white;
      color: white;
      font-weight: bold;
      cursor: pointer;
      height: 30px;
      line-height: 30px;
      display: inline-block;
      z-index: 1;
      border-radius: 15px;
      text-align: center;
    }
  }

  .play {
    background-color: red;
    width: 30px;
  }

  .edit {
    background-color: green;
    width: auto;
  }

  .delete {
    background-color: black;
    width: auto;
  }
`;

export const ClipDataComponent = styled.div`
  &:hover > .data {
    opacity: 1;
  }

  .data {
    background-color: rgba(255, 255, 255, 0.7);
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    opacity: 0;
    transition: transform opacity 0.3s easy-out;
    list-style: none;
    margin: 0;
    padding: 16px;
    text-align: left;
    font-size: 12px;

    > li {
      > span {
        font-weight: bold;
      }
    }
  }

  .actions {
    position: absolute;
    bottom: 16px;
    left: 16px;

    > a,
    > button {
      border: 1px solid white;
      color: white;
      font-weight: bold;
      cursor: pointer;
      height: 30px;
      line-height: 30px;
      display: inline-block;
      z-index: 1;
      border-radius: 15px;
      text-align: center;
    }
  }

  .play {
    background-color: red;
    width: 30px;
  }

  .edit {
    background-color: green;
    width: auto;
  }

  .delete {
    background-color: black;
    width: auto;
  }
`;

export const AddClipComponent = styled.div`
  display: flex;
  background-color: #ccc;
  min-width: 200px;
  position: relative;

  > button {
    cursor: pointer;
  }
`;

export const AddEditClipComponent = styled.div`
  background-color: cyan;
  padding: 8px;
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  font-size: 10px;
  height: 124px;

  ul {
    list-style: none;
    margin: 0 0 5px;
    padding: 0;
  }

  button {
    cursor: pointer;

    &.set {
      display: inline;
    }

    &.save {
      background-color: green;
      color: white;
    }

    &.cancel {
      background-color: grey;
      color: white;
    }
  }
`;
