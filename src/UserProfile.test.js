// https://www.apollographql.com/docs/guides/testing-react-components.html
// https://paradite.com/2017/11/16/test-react-apollo-components-enzyme-examples/
// https://github.com/apollographql/react-apollo/issues/1711#issuecomment-369511476

import React from "react";
import { MockedProvider } from "react-apollo/test-utils";
import UserProfile, { USER_PROFILE } from "./UserProfile";
import wait from "waait";
import { mount } from "enzyme";

const mocks = [
  {
    request: {
      query: USER_PROFILE,
      variables: {
        id: "douglas"
      }
    },
    result: {
      data: {
        user: {
          first_name: "Douglas",
          last_name: "Smith",
          email: "douglas@smith.com"
        }
      }
    }
  },
  {
    request: {
      query: USER_PROFILE,
      variables: {
        id: "bob"
      }
    },
    error: new Error("No bob found")
  }
];

async function setup(Component, waitTick = false) {
  const wrapper = mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      {Component}
    </MockedProvider>
  );
  if (waitTick) {
    await wait(0); // wait for response
    wrapper.update();
  }
  return wrapper;
}

it("has user-profile class", async () => {
  const wrapper = await setup(<UserProfile id="douglas" />);

  const actual = wrapper.find(".user-profile").length;
  const expected = 1;
  expect(actual).toBe(expected);
});

it("shows loading state", async () => {
  const wrapper = await setup(<UserProfile id="douglas" />);

  const actual = wrapper.text();
  const expected = "Loading...";
  expect(actual).toBe(expected);
});

it("renders error", async () => {
  const wrapper = await setup(<UserProfile id="bob" />, true);

  const actual = wrapper.text();
  const expected = "Network error: No bob found";
  expect(actual).toBe(expected);
});

it("renders name", async () => {
  const wrapper = await setup(<UserProfile id="douglas" />, true);

  const actual = wrapper.find(".name").text();
  const expected = "Name: Douglas Smith";
  expect(actual).toBe(expected);
});

it("renders email", async () => {
  const wrapper = await setup(<UserProfile id="douglas" />, true);

  const actual = wrapper.find(".email").text();
  const expected = "Email: douglas@smith.com";
  expect(actual).toBe(expected);
});
