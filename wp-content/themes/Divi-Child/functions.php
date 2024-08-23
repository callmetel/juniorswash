<?php

/**
 * Divi Cake Child Theme
 * Functions.php
 *
 * ===== NOTES ==================================================================
 * 
 * Unlike style.css, the functions.php of a child theme does not override its 
 * counterpart from the parent. Instead, it is loaded in addition to the parent's 
 * functions.php. (Specifically, it is loaded right before the parent's file.)
 * 
 * In that way, the functions.php of a child theme provides a smart, trouble-free 
 * method of modifying the functionality of a parent theme. 
 * 
 * Discover Divi Child Themes: https://divicake.com/products/category/divi-child-themes/
 * Sell Your Divi Child Themes: https://divicake.com/open/
 * 
 * =============================================================================== */

function divichild_enqueue_scripts()
{
	$css_cache_buster = date("YmdHi", filemtime(get_stylesheet_directory() . '/dist/style.min.css'));
	$js_cache_buster = date("YmdHi", filemtime(get_stylesheet_directory() . '/dist/scripts.min.css'));
	wp_enqueue_style('parent-style', get_template_directory_uri() . '/style.css');
	wp_enqueue_style('child-style', get_stylesheet_directory_uri() . '/dist/style.min.css', array(), $css_cache_buster);
	wp_enqueue_style('bootstrap-css', 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css', array(), false, '');
	wp_enqueue_script('bootstrap-js', 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js', array(), false, '');
	wp_enqueue_script('child-js', get_stylesheet_directory_uri() . '/dist/scripts.min.js', array('jquery'), $js_cache_buster, '');
}
add_action('wp_enqueue_scripts', 'divichild_enqueue_scripts');

function cc_mime_types($mimes)
{
	$mimes['svg'] = 'image/svg+xml';
	return $mimes;
}
add_filter('upload_mimes', 'cc_mime_types');
