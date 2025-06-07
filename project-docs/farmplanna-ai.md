# NaijaFarmHand: AI-Powered Farming Assistant for Nigerian Farmers

## Project Overview

NaijaFarmHand is an AI assistant designed specifically for beginner and early-stage farmers in Nigeria. The assistant provides practical, localized, and actionable farming guidance relevant to Nigerian conditions. This project leverages Google's Gemini 1.5 Pro model through the Google AI Development Kit (ADK) to create an interactive assistant with specialized tools for Nigerian farming needs.

## Key Features

- **Weather Information**: Access current weather data for specific Nigerian locations to aid in immediate farming decisions.
- **Farm Planning**: Generate customized checklists for starting various farm types (crops or poultry) at different scales.
- **Planting and Harvesting Guidance**: Get region-specific advice on optimal planting times and expected harvest periods for major Nigerian crops.
- **Smart Research Capabilities**: Search for specific farming questions not covered by the built-in tools, including pest control, crop varieties, and market price trends.
- **Nigerian Context**: All information is tailored to Nigerian farming conditions, terminology, and practices.

## Supported Farm Types

- **Crops**: Maize, Cassava, Guinea Corn, Groundnut, Yam  
- **Livestock**: Poultry (Broiler and Layer Chickens)

## Installation Requirements

This notebook requires:

- An OpenWeatherMap API key (for weather data)  
- Google credentials configured for accessing Gemini API  
- Various Python packages included in the implementation


### Set up your API key

The needed credential environment variable can be set to automatically configure the underlying API. This works for both the official Gemini Python SDK and for LangChain/LangGraph. 

To run the following cell, your API key must be stored it in a [Kaggle secret](https://www.kaggle.com/discussions/product-feedback/114053) with there respective names.

To make the key available through Kaggle secrets, choose `Secrets` from the `Add-ons` menu and follow the instructions to add your key or enable it for this notebook.


## Google ADK Imports

- Uses try-except to handle import failures gracefully
- Imports core components:
 - `Agent`: Main class for creating AI agents
 - `google_search`: Built-in web search tool
 - `InMemorySessionService`: Manages conversation state
 - `Runner`: Orchestrates agent execution
 - Support classes for types, context, and tool wrappers
- Provides user feedback on import success or failure
- Raises exceptions on failure to prevent code from running with missing dependencies

## Researcher Agent Setup

This code block:
- Creates a specialized agent named "researcher" using Gemini 1.5 Pro
- Configures it to answer specific farming questions using Google Search
- Instructs it to provide brief, direct answers rather than lengthy explanations
- Makes the agent self-sufficient rather than deflecting research to the user
- Wraps this agent as a tool (`google_search_grounding`) to be used by the main assistant

## WeatherTool Function

This function:
- Provides real-time weather data for Nigerian locations using OpenWeatherMap API
- Validates inputs: checks for API key presence and location specification
- Formats the location query with Nigeria country code (NG) for accuracy
- Sets metric units (Celsius, m/s) appropriate for Nigerian users
- Makes an API request with comprehensive error handling for:
 - API errors (non-200 responses)
 - HTTP errors (connection issues)
 - Missing location data (404 errors)
 - General exceptions
- Parses the response to extract key weather metrics: temperature, conditions, humidity, wind speed
- Returns a formatted weather report with all relevant data or a specific error message
