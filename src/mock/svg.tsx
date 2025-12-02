import React from 'react';

export default function SvgMock(props: React.SVGProps<SVGSVGElement>) {
  return <svg {...props} />;
}

export const ReactComponent = SvgMock;
