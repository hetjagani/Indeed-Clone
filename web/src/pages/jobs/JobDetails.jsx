/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Card,
  CardContent,
  Paper,
  Typography,
} from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import Button from '../../components/Button';

function JobDetails({ job }) {
  console.log(job);

  return (
    <Card variant="outlined" className="fixed" sx={{ borderRadius: '12px' }}>
      <Paper elevation={3}>
        <CardContent>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <p
              id="jobTitle"
              style={{
                fontSize: 'large',
                fontWeight: 'bold',
              }}
            >
              {job ? job.title : ''}
            </p>
            <CloseIcon fontSize="10px" />
          </div>
          <Typography
            variant="subtitle1"
            style={{ fontSize: '14px', marginTop: '-15px' }}
          >
            <a href={job ? job.company.length > 0 ? job.company[0].website : '' : ''}>
              {job ? job.company.length > 0 ? job.company[0].name : '' : ''}
            </a>
          </Typography>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginLeft: '-2px',
              marginTop: '-10px',
              fontSize: '14px',
            }}
          >
            <LocationOnIcon fontSize="10px" sx={{ color: '#595959' }} />
            <p>
              {job ? job.address : ''}
              {' '}
              &bull;
              {' '}
              {job ? job.jobLocation === 'remote' ? 'Remote' : 'In Person' : ''}
            </p>
          </div>
          <Button label="Apple on company site" style={{ width: '290px' }} />
        </CardContent>
      </Paper>
      <div style={{ maxHeight: '75vh', overflow: 'auto' }}>

        <div style={{ marginLeft: '20px' }}>
          <p
            id="jobTitle"
            style={{
              fontSize: 'large',
              fontWeight: 'bold',
            }}
          >
            Job details
          </p>
          <p style={{ fontWeight: 'bold', fontSize: '14px' }}>Salary</p>
          $12 - $50 an hour
        </div>
        <hr style={{
          borderTop: '1px solid #faf9f9', display: 'flex', justifyContent: 'center',
        }}
        />
        <div style={{ marginLeft: '20px', marginRight: '20px' }}>
          <p
            id="jobTitle"
            style={{
              fontSize: 'large',
              fontWeight: 'bold',
            }}
          >
            Full job description
          </p>
          <p style={{ fontSize: '14px' }}>
            AURIGA JOB POSTING

            (Auriga Website: www.aurigacorp.com)

            Auriga Corporation was established in 1990, to provide high-quality design, engineering and project management services for Electric Power, Telecommunication and Information Technology systems. Auriga’s cliental includes: investor owned and municipal utilities, rail and transit agencies, federal, state and local government agencies, and international public and private sector organizations.

            Auriga Corporation is looking for an experienced, talented and self motivated individual to join our team to help us provide our customers with innovative and cost effective solutions and services. An ideal candidate will be excited to be part of a company that moves quickly on a constant flow of ideas, is able to wear multiple hats as needed, and has the drive to succeed.

            Auriga Corporation currently has following vacancies in the Milpitas, California Office:

            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id diam vel quam elementum pulvinar etiam non quam lacus. Eu mi bibendum neque egestas congue quisque egestas diam. Et netus et malesuada fames ac turpis egestas sed tempus. Hendrerit gravida rutrum quisque non tellus. Sagittis orci a scelerisque purus semper eget duis at. Dignissim suspendisse in est ante in nibh mauris cursus. Fames ac turpis egestas maecenas pharetra convallis posuere morbi. Urna nec tincidunt praesent semper feugiat nibh sed pulvinar. Tortor pretium viverra suspendisse potenti nullam ac. Eu lobortis elementum nibh tellus molestie nunc non. Nam libero justo laoreet sit amet cursus sit amet dictum. Nullam ac tortor vitae purus faucibus ornare suspendisse sed nisi. Facilisis sed odio morbi quis commodo odio aenean sed adipiscing. Potenti nullam ac tortor vitae purus faucibus ornare suspendisse sed. Feugiat in fermentum posuere urna nec tincidunt praesent semper. Tortor consequat id porta nibh venenatis cras sed.

            Vulputate odio ut enim blandit volutpat maecenas volutpat. Aliquam purus sit amet luctus. Imperdiet dui accumsan sit amet nulla facilisi morbi tempus iaculis. Ut tortor pretium viverra suspendisse potenti nullam ac tortor vitae. Velit scelerisque in dictum non. Vulputate ut pharetra sit amet aliquam id. In fermentum et sollicitudin ac orci phasellus egestas tellus rutrum. Lectus sit amet est placerat. Ut etiam sit amet nisl purus in mollis nunc sed. Etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus. Malesuada fames ac turpis egestas maecenas. Ac tortor dignissim convallis aenean et tortor at. Faucibus pulvinar elementum integer enim neque. Eget mi proin sed libero enim sed.

            Facilisis gravida neque convallis a cras semper auctor neque vitae. Mattis nunc sed blandit libero. Purus ut faucibus pulvinar elementum integer enim. Sed pulvinar proin gravida hendrerit. Malesuada fames ac turpis egestas sed tempus urna et pharetra. Sed velit dignissim sodales ut eu sem integer. Tincidunt augue interdum velit euismod in pellentesque massa placerat duis. Lectus proin nibh nisl condimentum id venenatis a condimentum. Id consectetur purus ut faucibus pulvinar elementum integer enim neque. Scelerisque viverra mauris in aliquam. Posuere sollicitudin aliquam ultrices sagittis orci a. Sit amet nulla facilisi morbi tempus iaculis. Etiam erat velit scelerisque in. Ornare lectus sit amet est placerat. Dui ut ornare lectus sit. Cursus euismod quis viverra nibh cras pulvinar mattis nunc sed. Vivamus arcu felis bibendum ut tristique et egestas. Consectetur a erat nam at lectus.

            Tristique senectus et netus et. Aliquet lectus proin nibh nisl condimentum. Iaculis urna id volutpat lacus laoreet non curabitur gravida arcu. Eget aliquet nibh praesent tristique magna. Porta nibh venenatis cras sed felis eget velit. Purus viverra accumsan in nisl. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Lacus vel facilisis volutpat est velit. Interdum consectetur libero id faucibus. Congue eu consequat ac felis donec.

            Et netus et malesuada fames ac turpis egestas maecenas pharetra. Risus quis varius quam quisque id diam vel. Quisque egestas diam in arcu. Id porta nibh venenatis cras sed. Tempor id eu nisl nunc mi ipsum faucibus vitae aliquet. Lectus quam id leo in vitae turpis. Orci dapibus ultrices in iaculis nunc. Pellentesque habitant morbi tristique senectus. Aliquet sagittis id consectetur purus ut faucibus. Orci dapibus ultrices in iaculis nunc sed. Dignissim cras tincidunt lobortis feugiat vivamus at. Egestas purus viverra accumsan in nisl. Bibendum neque egestas congue quisque. Sed velit dignissim sodales ut eu sem integer vitae justo. Libero nunc consequat interdum varius. Eu consequat ac felis donec et odio pellentesque diam volutpat. Ut tristique et egestas quis ipsum suspendisse ultrices gravida. Eleifend quam adipiscing vitae proin sagittis nisl. Sit amet mauris commodo quis imperdiet massa tincidunt nunc.

            Pellentesque habitant morbi tristique senectus et. Eget mi proin sed libero. Lectus arcu bibendum at varius vel. Integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque. Non enim praesent elementum facilisis leo vel fringilla. Aliquet eget sit amet tellus. Lacus sed viverra tellus in hac habitasse platea dictumst vestibulum. Tellus id interdum velit laoreet id. Quis enim lobortis scelerisque fermentum dui faucibus in ornare. Libero enim sed faucibus turpis in eu. Netus et malesuada fames ac.

            Curabitur vitae nunc sed velit dignissim sodales. Ipsum a arcu cursus vitae congue. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Euismod nisi porta lorem mollis aliquam ut porttitor leo a. Metus vulputate eu scelerisque felis imperdiet. Cursus euismod quis viverra nibh cras. Vitae suscipit tellus mauris a diam maecenas sed enim ut. Sed faucibus turpis in eu mi bibendum neque. Mus mauris vitae ultricies leo integer malesuada nunc. Rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque. Senectus et netus et malesuada fames ac turpis. Amet tellus cras adipiscing enim eu turpis egestas pretium. Purus sit amet volutpat consequat. Aliquam sem et tortor consequat id porta nibh venenatis. Proin sagittis nisl rhoncus mattis. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Ipsum dolor sit amet consectetur.

            At risus viverra adipiscing at in tellus integer. Mattis pellentesque id nibh tortor id aliquet. Nisl purus in mollis nunc. Ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant. Ut sem viverra aliquet eget. Quis hendrerit dolor magna eget est lorem ipsum dolor sit. Neque laoreet suspendisse interdum consectetur libero id faucibus nisl. Mauris ultrices eros in cursus turpis. Sit amet justo donec enim. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor. Arcu non odio euismod lacinia. Neque egestas congue quisque egestas diam in. Volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Vestibulum lorem sed risus ultricies tristique nulla aliquet enim.

            Sit amet nulla facilisi morbi tempus iaculis. Id neque aliquam vestibulum morbi blandit cursus. Orci dapibus ultrices in iaculis nunc sed. Id donec ultrices tincidunt arcu non sodales. At risus viverra adipiscing at in tellus integer feugiat scelerisque. Elit eget gravida cum sociis natoque penatibus et magnis. Dolor sed viverra ipsum nunc. Fringilla urna porttitor rhoncus dolor purus non enim praesent. Ipsum dolor sit amet consectetur adipiscing elit ut. Felis eget velit aliquet sagittis id consectetur purus ut. Purus sit amet volutpat consequat mauris nunc. Duis ultricies lacus sed turpis. Id velit ut tortor pretium viverra suspendisse potenti. Pellentesque massa placerat duis ultricies lacus sed turpis tincidunt id.

            Sit amet tellus cras adipiscing enim. Aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices. Leo a diam sollicitudin tempor. Condimentum lacinia quis vel eros donec ac. Interdum velit laoreet id donec. Facilisis gravida neque convallis a cras semper auctor neque. Volutpat ac tincidunt vitae semper quis lectus nulla at volutpat. Arcu ac tortor dignissim convallis. A erat nam at lectus urna duis convallis convallis tellus. Magna fringilla urna porttitor rhoncus dolor purus non.
          </p>
        </div>
      </div>

    </Card>
  );
}

export default JobDetails;
