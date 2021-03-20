import {
  Grid,
  Box,
  Flex,
  Text,
  Image,
  SiteVariablesPrepared,
  List,
} from "@fluentui/react-northstar";
import React from "react";
//@ts-ignore
import ImagePicker from 'react-image-picker';
import 'react-image-picker/dist/index.css';

const interests = [
  'beer.jpeg', 'cars.jpeg', 'cooking.jpeg', 'drawing.jpeg',
  'football.jpeg', 'knitting.jpeg', 'photography.jpeg',
  'rc.jpeg', 'tvseries.jpeg', 'yoga.jpeg', 'goat.jpeg',
  'astronaut.jpeg'];

export function MyInterestsTab() {
  return (
    <Box
      style={{
        margin: "1.6rem 1.25rem",
      }}
    >
      <Text size="larger" weight="bold" as="h1" align="center">
        My Interests
      </Text>
      <Text
        as="p"
        align="center"
        variables={({ colorScheme }: SiteVariablesPrepared) => {
          console.log(colorScheme.default.foreground2);
          return {
            border: "1px solid red",
            backgroundColor: "red",
          };
        }}
        styles={{ opacity: ".65" }}
      >
        Tell us your interests so you can be matched with collegues.
      </Text>
        <div style={{
          maxWidth: "500px",
          width: "50%",
          margin: "0 auto",
        }}>
                  <ImagePicker 
          images={interests.map((img) => ({src: `/raw/${img}`, value: img.split('.')[0]}))}
          multiple
          // onPick={onPick}
        />
        </div>

    </Box>
  );
}

