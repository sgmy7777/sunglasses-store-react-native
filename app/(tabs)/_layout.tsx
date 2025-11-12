import { Tabs } from 'expo-router';
import Svg, { Path } from 'react-native-svg';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{
        title: 'Home',
        tabBarIcon: ({ color }) => <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <Path
            d="M3 9L12 3L21 9V21C21 21.5304 20.7893 22.0391 20.4142 22.4142C20.0391 22.7893 19.5304 23 19 23H5C4.46957 23 3.96086 22.7893 3.58579 22.4142C3.21071 22.0391 3 21.5304 3 21V9Z"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M9 23V13H15V23"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>,
      }} />
      <Tabs.Screen name="categories/index" options={{
        title: 'Categories',
        tabBarIcon: ({ color }) => <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <Path
            d="M10 22V7C10 6.73478 9.89464 6.48043 9.70711 6.29289C9.51957 6.10536 9.26522 6 9 6H4C3.46957 6 2.96086 6.21071 2.58579 6.58579C2.21071 6.96086 2 7.46957 2 8V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H16C16.5304 22 17.0391 21.7893 17.4142 21.4142C17.7893 21.0391 18 20.5304 18 20V15C18 14.7348 17.8946 14.4804 17.7071 14.2929C17.5196 14.1054 17.2652 14 17 14H2M15 2H21C21.5523 2 22 2.44772 22 3V9C22 9.55228 21.5523 10 21 10H15C14.4477 10 14 9.55228 14 9V3C14 2.44772 14.4477 2 15 2Z"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>,
      }} />
      <Tabs.Screen name="cart/index" options={{
        title: 'Cart',
        tabBarIcon: ({ color }) => <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <Path
            d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.2637 8.38787 15.5583C8.75382 15.8529 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3262 15.8529 20.6921 15.5583C21.0581 15.2637 21.3086 14.8504 21.4 14.39L23 6H6"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M9 20C9.55228 20 10 20.4477 10 21C10 21.5523 9.55228 22 9 22C8.44772 22 8 21.5523 8 21C8 20.4477 8.44772 20 9 20Z"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M20 20C20.5523 20 21 20.4477 21 21C21 21.5523 20.5523 22 20 22C19.4477 22 19 21.5523 19 21C19 20.4477 19.4477 20 20 20Z"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>,
      }} />
      <Tabs.Screen name="account/index" options={{
        title: 'Account',
        tabBarIcon: ({ color }) => <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <Path
            d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>,
      }} />
    </Tabs>
  );
}

