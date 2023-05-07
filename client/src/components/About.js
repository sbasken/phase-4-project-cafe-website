import React from 'react'
import { Grid, Image } from 'semantic-ui-react'
import banner from '../binarybeansbanner.png'

const About = () => {
  return (
    <Grid celled='internally' stackable>
      <Grid.Row>
        <Image src={banner} />
      </Grid.Row>

      <Grid.Row>
        <Grid.Column width={13} textAlign='center'>
            <br></br>
            <h1>Binary Beans Cafe</h1>
            <br></br>
          <Grid columns={3} divided stackable>
            <Grid.Column>
              <h3>General Inquiries</h3>
              <p>hello@binarybeanscafe.com</p>
            </Grid.Column>
            <Grid.Column>
              <h3>Location</h3>
              <p>777 Flatiron St.</p>
              <p>Seattle, WA 98100</p>
            </Grid.Column>
            <Grid.Column>
              <h3>Phone Number</h3>
              <p>☎ 123-456-7890</p>
            </Grid.Column>
          </Grid>
        </Grid.Column>
        <Grid.Column width={3}>
          <Image src='https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y29mZmVlfGVufDB8MXwwfHw%3D&auto=format&fit=crop&w=800&q=60' />
        </Grid.Column>
      </Grid.Row>
{/* 
    <Grid.Row>
      <Grid.Column width={3}>
        <Image src='https://images.unsplash.com/photo-1482350325005-eda5e677279b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y2FmZXxlbnwwfDF8MHx8&auto=format&fit=crop&w=800&q=60' />
      </Grid.Column>
      <Grid.Column width={10}>
        <h1></h1>
      </Grid.Column>
      <Grid.Column width={3}>
        <Image src='https://images.unsplash.com/photo-1497636577773-f1231844b336?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGNhZmV8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60' />
      </Grid.Column>
    </Grid.Row> */}
  </Grid>
  )
}

export default About