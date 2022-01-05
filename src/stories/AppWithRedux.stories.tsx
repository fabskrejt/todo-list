import React from 'react';
import {ComponentMeta,ComponentStory} from '@storybook/react';
import AppWithRedux from "../AppWithRedux";
import {ReduxStoreProviderDecorator} from "../store/ReduxStoreProviderDecorator";
import {Provider} from "react-redux";
import {store} from "../store/store";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TODOLIST/AppWithRedux',
  component: AppWithRedux,
 // decorators: [ReduxStoreProviderDecorator]
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof AppWithRedux>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
//ts-ignore
const Template: ComponentStory<typeof AppWithRedux> = (args) => <Provider store={store}> <AppWithRedux /></Provider>;

export const AppWithReduxStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AppWithReduxStory.args = {};
