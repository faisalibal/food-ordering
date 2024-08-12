import { motion } from 'framer-motion';
import { Dispatch, SetStateAction, useRef } from 'react';
import { BsSearch } from 'react-icons/bs';
import useOnClickOutside from '../../hook/useOnCLickOutside';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { searchActiveFalse, searchActiveTrue } from '../../redux/SearchInput';
import './InputSearch.css';

type search = {
  setSearch: Dispatch<SetStateAction<string>>;
};
export const InputSearch = ({ setSearch }: search) => {
  const searchRef = useRef(null);

  const { searchActive } = useAppSelector((state) => ({
    ...state.searchInput,
  }));
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useOnClickOutside(searchRef, () => dispatch(searchActiveFalse()));
  return (
    <div>
      {searchActive && (
        <motion.div
          initial={{
            width: '0px',
          }}
          animate={{
            width: '70vw',
          }}
          exit={{
            width: '0px',
          }}
          className="search-food-container"
          ref={searchRef}
        >
          <input
            type="text"
            placeholder="Search food"
            onChange={handleChange}
          />
          <span onClick={() => dispatch(searchActiveFalse())}>
            <BsSearch style={{ fontSize: '20px', color: '#0F1F0D' }} />
          </span>
        </motion.div>
      )}
      {!searchActive && (
        <span onClick={() => dispatch(searchActiveTrue())}>
          <BsSearch style={{ fontSize: '20px' }} />
        </span>
      )}
    </div>
  );
};
