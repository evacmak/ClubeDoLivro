import 'semantic-ui-css/semantic.min.css'

import {
    CardMeta,
    CardHeader,
    CardDescription,
    CardContent,
    Card,
    Icon,
    Image,
  } from 'semantic-ui-react'
  
  const ImageCard = ({ src, header, meta, description, extra }) => (
    <Card style={{width: '180px', marginTop: 0}}>
      <Image 
        src={src} 
        style={{ width: '100%'}} 
      />
      <CardContent style={{height: '80px'}}>
        <CardHeader>{header}</CardHeader>
        <CardMeta>{meta}</CardMeta>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      {extra && (
        <CardContent extra>
          <a>
            {/* <Icon name='user' /> */}
            {extra}
          </a>
        </CardContent>
      )}
    </Card>
  )
  
  export default ImageCard;
  