import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Home from "../components/Home";
import SearchBar from "../components/SearchBar";
import Paged from "../components/Paged";
import Card from "../components/Card";

configure({ adapter: new Adapter() });

describe("<Home />", () => {
        let wrapper;
        beforeEach(() => {
          wrapper = shallow(<Home />);
        });
      
        it("deberia renderizar 1 componente <SearchBar />", () => {
          expect(wrapper.find(SearchBar)).toHaveLength(1);
        });
      
        it("deberia renderizar 1 componente <Paged />", () => {
                expect(wrapper.find(Paged)).toHaveLength(1);
        });

      
      });
      