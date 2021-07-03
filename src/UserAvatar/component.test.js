import React from 'react';
import UserAvatar from './UserAvatar';
import { render } from '../utils/testing-utils';
import '@testing-library/jest-dom/extend-expect';

describe("UserAvatar", () => {

  it('Renders with avatar.', () => {

    const props = {
      avatar: 'user.png',
      username: "username1",
      size: "large",
      shape: "circle"
    };

    const { getByRole } = render(<UserAvatar {...props} />);

    const img = getByRole('img');

    expect(img).toHaveAttribute('src', '/static/avatars/user.png');
    expect(img).toHaveAttribute('alt', 'Avatar for ：username1');
  })

  it('Renders without avatar.', () => {

    const username = "username1"

    const props = {
      avatar:  null,
      username: username,
      size: "large",
      shape: "circle"
    };

    const { getByText, debug } = render(<UserAvatar {...props} />);
    expect(getByText(username[0])).toHaveClass("ant-avatar-string");
  })

})
