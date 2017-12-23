<?php
//
// A very simple PHP example that sends a HTTP POST to a remote site
//

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL,"https://backpackr-talk.slack.com/services/hooks/slackbot?token=KAqNxVAidiPcbZ3EixDDIPqg&channel=tg0825test");
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, "payload=1111");

// in real life you should use something like:
// curl_setopt($ch, CURLOPT_POSTFIELDS,
//          http_build_query(array('postvar1' => 'value1')));

// receive server response ...
// curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$server_output = curl_exec ($ch);

curl_close ($ch);

// further processing ....
if ($server_output == "OK") {

} else {

}
// curl -d "payload=Hello from Slackbot" 'https://backpackr-talk.slack.com/services/hooks/slackbot?token=KAqNxVAidiPcbZ3EixDDIPqg&channel=tg0825test'
?>

<?php
// // webhook
// // https://hooks.slack.com/services/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
//
// // remote integration
// // https://backpackr-talk.slack.com/services/hooks/slackbot?token=KAqNxVAidiPcbZ3EixDDIPqg
//
//         //Options
//         $token    = 'LPE4VyqbcVXAjBUzJ9Wxt2lj';
//         $domain   = 'backpackr-talk';
//         $channel  = '#tg0825test';
//         $bot_name = 'Webhook';
//         $icon     = ':alien:';
//         $message  = 'Your message';
//         $attachments = array([
//             'fallback' => 'Lorem ipsum',
//             'pretext'  => 'Lorem ipsum',
//             'color'    => '#ff6600',
//             'fields'   => array(
//                 [
//                     'title' => 'Title',
//                     'value' => 'Lorem ipsum',
//                     'short' => true
//                 ],
//                 [
//                     'title' => 'Notes',
//                     'value' => 'Lorem ipsum',
//                     'short' => true
//                 ]
//             )
//         ]);
//         $data = array(
//             'channel'     => $channel,
//             'username'    => $bot_name,
//             'text'        => $message,
//             'icon_emoji'  => $icon,
//             'attachments' => $attachments
//         );
//         $data_string = json_encode($data);
//         $ch = curl_init('https://'.$domain.'.slack.com/services/hooks/slackbot?token='.$token);
//             curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
//             curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
//             curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//             curl_setopt($ch, CURLOPT_HTTPHEADER, array(
//                 'Content-Type: application/json',
//                 'Content-Length: ' . strlen($data_string))
//             );
//         //Execute CURL
//         $result = curl_exec($ch);
//         return $result;
 ?>
