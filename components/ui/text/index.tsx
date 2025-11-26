import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';

export interface TextProps extends RNTextProps {
  variant?: 'heading' | 'subheading' | 'body' | 'label' | 'caption';
}

export const Text = React.forwardRef<RNText, TextProps>(
  ({ style, ...props }, ref) => {
    return <RNText ref={ref} {...props} style={style} />;
  }
);

Text.displayName = 'Text';
