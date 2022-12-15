import React from 'react';
import {BsSun, BsLightningCharge} from 'react-icons/bs';
import {AiOutlineWarning} from 'react-icons/ai';

type ParentProps = Readonly<{
  children: React.ReactNode;
}>;

type GridProps = ParentProps;

export const Grid = ({children}: GridProps) => (
  <div className="Grid">{children}</div>
);

type ColProps = ParentProps & {
  title: string;
  icon: React.ReactNode;
};

export const Col = ({children, title, icon}: ColProps) => (
  <div className="Col">
    <div className="icon">{icon}</div>
    <h2>{title}</h2>
    {children}
  </div>
);

export const Welcome = () => (
  <div className="Welcome">
    <h1>CatGPT</h1>

    <Grid>
      <Col title="Examples" icon={<BsSun size={25} />}>
        <div>"Who's a good kitty?"</div>
        <div>"Hey, get off the counter!"</div>
        <div>"Meoowwww"</div>
      </Col>

      <Col title="Capabilities" icon={<BsLightningCharge size={25} />}>
        <div>Is cute</div>
        <div>Passes the Purring test</div>
        <div>
          Trained to decline both appropriate and inappropriate requests
        </div>
      </Col>

      <Col title="Limitations" icon={<AiOutlineWarning size={25} />}>
        <div>May occasionally show an image that's not a cat</div>
        <div>Does not use any intelligence, artificial or otherwise</div>
        <div>Limited knowledge of world and events after 2021 (and before)</div>
      </Col>
    </Grid>
  </div>
);
