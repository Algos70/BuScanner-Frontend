import { Container, Button, Form, Dropdown } from "react-bootstrap";
import { BiTransfer } from "react-icons/bi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FormInterface, ProvinceModel } from "../../../Models/models";
import {
  getAllProvinceNames,
  getProvinceByName,
  increaseCityPopularityById,
} from "../../../Utils/APIUtils";
import Fuse from "fuse.js";
import "./NavBarLarge.css";
import UserAvatar from "../../UserAvatar/UserAvatar";
import { getLocalUserInfo } from "../../../Utils/Utils";

function NavBarLarge() {
  const [form, setForm] = useState<FormInterface>({
    from: "",
    to: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [provinceNames, setProvinceNames] = useState<string[]>([]);
  const [suggestionsTo, setSuggestionsTo] = useState<
    { item: string; refIndex: number; score: number | undefined }[]
  >([{ item: "", refIndex: 0, score: 0 }]);
  const [suggestionsFrom, setSuggestionsFrom] = useState<
    { item: string; refIndex: number; score: number | undefined }[]
  >([{ item: "", refIndex: 0, score: 0 }]);
  const [showSuggestionsTo, setShowSuggestionsTo] = useState<boolean>(false);
  const [showSuggestionsFrom, setShowSuggestionsFrom] =
    useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userData, setUserData] = useState<string | null>(getLocalUserInfo());

  const options = {
    includeScore: true,
    threshold: 0.5,
  };
  const fuse = new Fuse(provinceNames, options);

  const handleTextChange = (value: string, fieldType: "from" | "to") => {
    setForm({ ...form, [fieldType]: value });

    if (value) {
      const result = fuse.search(value);
      fieldType === "to"
        ? setSuggestionsTo(
            result.map(({ item, refIndex, score }) => ({
              item,
              refIndex,
              score,
            }))
          )
        : setSuggestionsFrom(
            result.map(({ item, refIndex, score }) => ({
              item,
              refIndex,
              score,
            }))
          );
      fieldType === "to"
        ? setShowSuggestionsTo(true)
        : setShowSuggestionsFrom(true);
    } else {
      fieldType === "to" ? setSuggestionsTo([]) : setSuggestionsFrom([]);
      fieldType === "to"
        ? setShowSuggestionsTo(false)
        : setShowSuggestionsFrom(false);
    }
  };

  const handleSelectSuggestion = (
    item: string,
    currentField: "from" | "to"
  ) => {
    if (item) {
      setForm({ ...form, [currentField]: item });
      setShowSuggestionsTo(false);
      setShowSuggestionsFrom(false);
    }
  };

  const switchPlaces = () => {
    const temp = form.from;
    setForm({ ...form, from: form.to, to: temp });
  };

  const handleShowSuggestions = (
    input: typeof suggestionsTo,
    currentField: "from" | "to"
  ) => {
    return (
      <Dropdown
        className="position-absolute w-100"
        style={{ top: "100%", left: 0 }}
      >
        <Dropdown.Menu
          style={{ maxHeight: "400px", overflowY: "auto" }}
          className="w-100 "
          show
        >
          {input.map((suggestion, index) => (
            <Dropdown.Item
              onClick={() => {
                handleSelectSuggestion(suggestion.item, currentField);
              }}
              key={index}
              className="list-group-item"
            >
              {suggestion.item}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  const handleButtonClicked = () => {
    getProvinceByName(form.to).then((response) => {
      const city = response.data as ProvinceModel;
      increaseCityPopularityById(city.id);
    });
  };

  useEffect(() => {
    getAllProvinceNames().then((response) => {
      setProvinceNames(response.data);
    });
    setUserData(getLocalUserInfo());
  }, []);

  return (
    <div>
      {/* NAVBAR TOP */}
      <Container fluid className="navbar-large">
        <Container className="navlargeContainer">
          <a href="/" className="nav-text">
            BuScanner
          </a>
          {userData ? (
            <UserAvatar userInfo={JSON.parse(userData)} />
          ) : (
            <div className="navlargeItems">
              <a href="/signup">
                <Button className="navLargeButton">Sign Up</Button>
              </a>
              <a href="/signin">
                <Button className="navLargeButton">Sign in</Button>
              </a>
            </div>
          )}
        </Container>
      </Container>

      {/* HEADER */}
      <Container fluid className="header">
        <Container className="headerContainer">
          <div className="headerList">
            <div className="headerListItem">
              <h4 className="py-3">Quickly scan all your bus prices</h4>
            </div>
          </div>
          {/* HEADER SEARCH ITEMS */}
          <div className="headerSearch">
            <Form className="d-flex">
              <div className="position-relative me-2 custom-form ">
                <Form.Control
                  type="text"
                  placeholder="From"
                  className="me-2 p-3 rounded-start rounded-end-0 custom-form h-100"
                  value={form.from}
                  onChange={(e) => {
                    handleTextChange(e.target.value, "from");
                  }}
                />
                {showSuggestionsFrom &&
                  suggestionsFrom.length > 0 &&
                  handleShowSuggestions(suggestionsFrom, "from")}
              </div>

              <Button
                variant="light"
                className="me-2 rounded-0"
                onClick={switchPlaces}
              >
                <BiTransfer />
              </Button>
              <div className="position-relative me-2 custom-form ">
                <Form.Control
                  type="text"
                  placeholder="To"
                  className="me-2 rounded-0 custom-form h-100"
                  value={form.to}
                  onChange={(e) => handleTextChange(e.target.value, "to")}
                />
                {showSuggestionsTo &&
                  suggestionsTo.length > 0 &&
                  handleShowSuggestions(suggestionsTo, "to")}
              </div>
              <Form.Control
                type="date"
                placeholder="Departure"
                className="me-2 rounded-0"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />

              <div className="search-btn-container">
                <Link
                  to={{
                    pathname: "/searchlist",
                  }}
                  onClick={handleButtonClicked}
                  state={{ form }}
                  className="btn btn-success searchbtn rounded-0 p-3 h-100 me-2 "
                >
                  Search
                </Link>
              </div>
            </Form>
          </div>
        </Container>
      </Container>
    </div>
  );
}

export default NavBarLarge;
