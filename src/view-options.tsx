const Viewoptions = () => {
  return (
    <>
      <div>
        <label htmlFor="view-options">
          <p>Display Options: </p>
        </label>
        <select name="view-options">
          <option>Sort (Widest Opening)</option>
          <option>Sort (Smallest Opening)</option>
        </select>
      </div>
    </>
  );
};

export default Viewoptions;
