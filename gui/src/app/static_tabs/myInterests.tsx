import {
  Box,
  Text,
  Button,
} from "@fluentui/react-northstar";
import React from "react";
import "react-image-picker/dist/index.css";
//@ts-ignore
import ImagePicker from "react-image-picker";

import "react-datepicker/dist/react-datepicker.css";
//@ts-ignore
import DatePicker from "react-datepicker";

interface IProps {}
interface IState {
  fromDate: Date;
  toDate: Date;
}

const interests = [
  "beer.jpeg",
  "cars.jpeg",
  "cooking.jpeg",
  "drawing.jpeg",
  "football.jpeg",
  "knitting.jpeg",
  "photography.jpeg",
  "rc.jpeg",
  "tvseries.jpeg",
  "yoga.jpeg",
  "goat.jpeg",
  "astronaut.jpeg",
];

export class MyInterestsTab extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      fromDate: new Date(),
      toDate: new Date(),
    };
  }
  render() {
    return (
      <Box
        style={{
          margin: "1.6rem 1.25rem",
        }}
      >
        <Text size="larger" weight="bold" as="h1" align="center">
          My Interests
        </Text>

        <Text size="medium" as="h3" align="center" styles={{ opacity: ".65" }}>
          Tell us your interests so you can be matched with collegues.
        </Text>

        <div
          style={{
            maxWidth: "500px",
            width: "50%",
            margin: "0 auto",
          }}
        >
          <ImagePicker
            images={interests.map((img) => ({
              src: `/raw/${img}`,
              value: img.split(".")[0],
            }))}
            multiple
            // onPick={onPick}
          />
        </div>
        <Text size="large" weight="bold" as="h2" align="center">
          Time Preferences
        </Text>
        <div
          style={{
            maxWidth: "500px",
            width: "50%",
            margin: "0 auto",
            display: "flex",
          }}
        >
          <div
            style={{
              padding: "27px",
            }}
          >
            <DatePicker
              selected={this.state.fromDate}
              onChange={(date: Date) => this.setState({ fromDate: date })}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="hh:mm aa"
            />
          </div>

          <Text
            size="medium"
            as="p"
            align="center"
            styles={{ opacity: ".65", paddingTop: "13px" }}
          >
            to
          </Text>
          <div
            style={{
              padding: "27px",
            }}
          >
            <DatePicker
              style={{
                padding: "27px",
              }}
              selected={this.state.toDate}
              onChange={(date: Date) => this.setState({ toDate: date })}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="hh:mm aa"
            />
          </div>
        </div>
        <div
          style={{
            maxWidth: "500px",
            margin: "0 auto",
            display: "flex",
            width: "110px",
          }}
        >
          <Button content="Save" loader="Hack bandwidth" />
        </div>
      </Box>
    );
  }
}
